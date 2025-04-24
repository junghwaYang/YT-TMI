'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { extractVideoId } from '@/lib/extractVideoId';

const YOUTUBE_URL_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}(&.*)?$/;

const isValidYoutubeUrl = (url: string): boolean => {
  return YOUTUBE_URL_REGEX.test(url);
};

export default function Home() {
  const [value, setValue] = useState<string>('');
  const videoId = extractVideoId(value);
  const route = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (!isValidYoutubeUrl(value) && !videoId) {
      toast.error('유효한 유튜브 URL을 입력해주세요.');
      setValue('');
      return;
    }
    route.push(`/video/${videoId}`);
  };
  return (
    <main>
      <Container className="flex flex-col items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-4 md:text-4xl font-bold">
            YT-TMI (YouTube 댓글 감정 분석기)
          </h1>
          <p className="text-xs md:text-base text-gray-500 text-center">
            이곳은 YouTube 댓글을 <br />
            감정 분석하는 웹 애플리케이션입니다.
          </p>
        </div>

        <div className="flex items-center justify-center mt-10 w-full lg:w-1/2 px-4 ">
          <div className="flex w-full items-center space-x-2">
            <Input
              type="text"
              placeholder="유튜브 영상 url을 입력해주세요"
              value={value}
              onChange={handleChange}
              className="text-xs"
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
