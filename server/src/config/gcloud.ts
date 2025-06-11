// server/src/config/gcloud.ts

import path from 'path';
import { ImageAnnotatorClient } from '@google-cloud/vision';

// Use absolute path to the service account file
const serviceKeyPath = path.resolve(__dirname, '../../keys/rosolve-service.json');

const visionClient = new ImageAnnotatorClient({
  keyFilename: serviceKeyPath,
});

export { visionClient };
