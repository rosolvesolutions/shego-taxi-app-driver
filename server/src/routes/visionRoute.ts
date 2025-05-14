import express, { Request, Response } from 'express'
import multer from 'multer'
import { ImageAnnotatorClient } from '@google-cloud/vision'
import path from 'path'

const router = express.Router()

// Set up in-memory storage for multer (no files saved on disk)
const storage = multer.memoryStorage()
const upload = multer({ storage })

// Initialize Google Cloud Vision client with credentials
const client = new ImageAnnotatorClient({
  keyFilename: path.join(__dirname, '../keys/vision-api-key.json'),
})

// POST /ocr endpoint to accept image file and perform OCR
router.post('/ocr', upload.single('image'), async (req: Request, res: Response) => {
  try {
    // Retrieve uploaded file
    const file = req.file as Express.Multer.File

    // Check if file exists
    if (!file) {
      console.warn('❗ No file received in request')
      res.status(400).json({ error: 'No file uploaded' })
      return
    }

    console.log('✅ Received file:', file.originalname)

    // Send image buffer to Google Vision API for text detection
    const [result] = await client.textDetection(file.buffer)

    // Extract detected text annotations
    const detections = result.textAnnotations ?? []

    console.log('✅ OCR detections count:', detections.length)

    // Send response back to client
    res.status(200).json({
      text: detections.length > 0 ? detections[0].description : 'No text found',
      raw: detections,
    })
  } catch (err) {
    // Handle and log errors
    const error = err as Error
    console.error('❌ Error during OCR:', error.message)
    res.status(500).json({ error: 'Failed to process image', details: error.message })
  }
})

export default router
