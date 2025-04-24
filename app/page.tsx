'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import Title from '@/components/layout/Title';
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
    <div className="flex flex-col items-center justify-center h-screen">
      <Title>
        <Title.h1>YT-TMI</Title.h1>
        <Title.p>
          이곳은 YouTube 댓글을 <br />
          감정 분석하는 웹 애플리케이션입니다.
        </Title.p>
      </Title>

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
    </div>
  );
}
