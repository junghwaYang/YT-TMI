'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CommentChart } from '@/components/CommentChart';
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

  const 긍정수 = sentiment.filter(item => item.sentiment === '긍정').length;
  const 부정수 = sentiment.filter(item => item.sentiment === '부정').length;
  const 중립수 = sentiment.filter(item => item.sentiment === '중립').length;
  const 총댓글수 = sentiment.length;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Video Analysis</h1>
      <p className="text-lg text-gray-500">YouTube 댓글 감정 분석기</p>

      <VideoEmbed videoId={String(videoId)} />

      <CommentChart />

      {comments.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mt-4">Sentiment Analysis</h2>
          <p className="text-lg mt-2">
            총 댓글 수: {총댓글수} | 긍정: {긍정수} | 부정: {부정수} | 중립:{' '}
            {중립수}
          </p>
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
