// lib/gcp.ts
export const gcpCredentials = JSON.parse(
  Buffer.from(process.env.GCP_CREDENTIALS_BASE64 ?? '', 'base64').toString('utf-8')
);
