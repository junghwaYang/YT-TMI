import { NextResponse } from 'next/server';

import { analyzeSentiment } from '@/lib/analyzeSentiment';

export async function POST(req: Request) {
  try {
    const { comments } = await req.json();

    const results = await Promise.all(
      comments.map(async (text: string) => {
        const sentiment = await analyzeSentiment(text);
        return { text, sentiment };
      })
    );

    return NextResponse.json(results);
  } catch (err) {
    console.error('[API /analyze] Error:', err);
    return NextResponse.json({ error: '감정 분석 실패' }, { status: 500 });
  }
}
