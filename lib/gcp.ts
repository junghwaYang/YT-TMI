import fs from 'fs';
import path from 'path';

const isVercel = !!process.env.VERCEL;

export const gcpCredentials = isVercel
  ? JSON.parse(Buffer.from(process.env.GCP_CREDENTIALS_BASE64 ?? '', 'base64').toString('utf-8'))
  : JSON.parse(fs.readFileSync(path.join(process.cwd(), 'gcp-key.json'), 'utf-8'));
