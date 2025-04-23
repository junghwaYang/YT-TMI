'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import VideoEmbed from '@/components/VideoEmbed';
import { getYoutubeComments } from '@/lib/getYoutubeComments';
import { postSentiment } from '@/lib/postSentiment';

export default function VideoAnalysisPage() {
  const [comments, setComments] = useState<string[]>([]); // 댓글 상태 추가
  const [sentiment, setSentiment] = useState<
    { text: string; sentiment: '긍정' | '부정' | '중립' }[]
  >([]); // 감정 상태 추가
  const param = useParams();
  const { videoId } = param; // youtubeId 추출

  useEffect(() => {
    // 댓글 가져오기
    const fetchComments = async () => {
      const res = await getYoutubeComments(String(videoId));
      setComments(res);
    };

    fetchComments();
  }, [videoId]);

  useEffect(() => {
    // 감정 분석하기
    const fetchSentiment = async () => {
      if (comments.length === 0) return;
      const res = await postSentiment({ comments });
      setSentiment(res);
    };

    fetchSentiment();
  }, [comments]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Video Analysis</h1>
      <p className="text-lg text-gray-500">YouTube 댓글 감정 분석기</p>

      <VideoEmbed videoId={String(videoId)} />

      {comments.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mt-4">Sentiment Analysis</h2>
          <ul>
            {sentiment.map((item, index) => (
              <li key={index} className="mt-2">
                {item.text} - {item.sentiment}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
