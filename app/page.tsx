'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { extractVideoId } from '@/lib/extractVideoId';

export default function Home() {
  const [value, setValue] = useState<string>('');
  const videoId = extractVideoId(value);
  const route = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (!videoId) return alert('유효한 유튜브 URL을 입력해주세요.');
    route.push(`/video/${videoId}`);
    console.log(videoId);
  };
  return (
    <main>
      <Container>
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4xl font-bold">
            YT-TMI (YouTube 댓글 감정 분석기)
          </h1>
          <p className="text-4 text-gray-500">
            이곳은 YouTube 댓글을 감정 분석하는 웹 애플리케이션입니다.
          </p>
        </div>

        <div className="flex items-center justify-center mt-10">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="유튜브 영상 url을 입력해주세요"
              value={value}
              onChange={handleChange}
            />
            <Button type="button" onClick={handleClick}>
              분석하기
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
