// server/src/utils/ocr.ts
import { visionClient } from '../config/gcloud';

export async function extractTextFromImage(buffer: Buffer) {
  const [result] = await visionClient.textDetection(buffer);
  const detections = result.textAnnotations ?? [];
  const fullText = detections.length > 0 ? detections[0].description : '';
  return fullText;
}
