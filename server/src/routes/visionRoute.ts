import express, { Request, Response } from 'express'
import multer from 'multer'
// 可选: 只有在 Vision 类型有问题时才加下面一行
// @ts-ignore
import { ImageAnnotatorClient } from '@google-cloud/vision'
import path from 'path'

const router = express.Router()

const storage = multer.memoryStorage()
const upload = multer({ storage })

const client = new ImageAnnotatorClient({
  keyFilename: path.join(__dirname, '../keys/vision-api-key.json'),
})

router.post('/ocr', upload.single('image'), async (req: Request, res: Response) => {
  try {
    const file = req.file as Express.Multer.File

    if (!file) {
      console.warn('❗ No file received in request')
      res.status(400).json({ error: 'No file uploaded' })
      return
    }

    console.log('✅ Received file:', file.originalname)

    const [result] = await client.textDetection(file.buffer)

    const detections = result.textAnnotations ?? []

    console.log('✅ OCR detections count:', detections.length)

    res.status(200).json({
      text: detections.length > 0 ? detections[0].description : 'No text found',
      raw: detections,
    })
  } catch (err: any) {
    console.error('❌ Error during OCR:', err.message)
    res.status(500).json({ error: 'Failed to process image', details: err.message })
  }
})
export default router
