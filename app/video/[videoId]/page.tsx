'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import VideoEmbed from '@/components/VideoEmbed';
import { getYoutubeComments } from '@/lib/getYoutubeComments';

export default function VideoAnalysisPage() {
  const [comments, setComments] = useState<string[]>([]); // 댓글 상태 추가
  const param = useParams();
  const { videoId } = param; // youtubeId 추출

  useEffect(() => {
    const fetchComments = async () => {
      const res = await getYoutubeComments(String(videoId));
      setComments(res);
      console.log(res);
    };

    fetchComments();
  }, [videoId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Video Analysis</h1>
      <p className="text-lg text-gray-500">YouTube 댓글 감정 분석기</p>

      <VideoEmbed videoId={String(videoId)} />

      {comments.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Comments</h2>
          <ul className="list-disc list-inside">
            {comments.map((comment, index) => (
              <li key={index} className="mt-2">
                {comment}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
