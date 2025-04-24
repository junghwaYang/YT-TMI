import type { protos } from '@google-cloud/language';
import { LanguageServiceClient } from '@google-cloud/language';

import { gcpCredentials } from './gcp';

const client = new LanguageServiceClient({
  credentials: gcpCredentials,
  projectId: gcpCredentials.project_id,
});

export async function analyzeSentiment(text: string): Promise<'긍정' | '부정' | '중립'> {
  const laughterRegex = /(ㅋㅋ|ㅎㅎ|웃기|재밌|웃긴|😂|🤣)/i;
  if (laughterRegex.test(text.toLowerCase())) {
    return '긍정';
  }

  const document: protos.google.cloud.language.v1.IDocument = {
    content: text,
    type: 'PLAIN_TEXT',
    language: 'ko',
  };

  const [result] = await client.analyzeSentiment({ document });

  const score = result.documentSentiment?.score ?? 0;

  if (score > 0.1) return '긍정';
  if (score < -0.1) return '부정';
  return '중립';
}
