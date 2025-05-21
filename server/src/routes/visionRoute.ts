// server/src/routes/visionRoute.ts
import express, { Request, Response } from 'express';
import multer from 'multer';
import { extractTextFromImage } from '../utils/ocr';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Extract MRZ-like lines (typically last 2 lines of passport/ID)
function extractMRZ(text: string): string[] {
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length >= 40);
  return lines.slice(-2);
}

router.post(
  '/ocr',
  upload.single('image'),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file as Express.Multer.File;

      if (!file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      console.log('✅ File received:', file.originalname);

      const fullText = await extractTextFromImage(file.buffer);
      const mrzLines = extractMRZ(fullText ?? '');

      console.log('✅ MRZ:', mrzLines);

      res.status(200).json({
        fullText,
        mrzLines,
      });
    } catch (error: any) {
      console.error('❌ OCR Error:', error.message);
      res.status(500).json({
        error: 'Failed to process image',
        details: error.message,
      });
    }
  }
);

export default router;
