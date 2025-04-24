'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import Container from '@/components/layout/Container';
import Title from '@/components/layout/Title';
import { Button } from '@/components/ui/button';
import getVisiblePages from '@/lib/getVisiblePages';
import { getYoutubeComments } from '@/lib/getYoutubeComments';
import { postSentiment } from '@/lib/postSentiment';

import CommentFilter from './_components/CommentFilter';
import CommentList from './_components/CommentList';
import CommentPagination from './_components/CommentPagination';
import CommentSkeleton from './_components/CommentSkeleton';
import ErrorSection from './_components/ErrorSection';
import VideoChatSection from './_components/VideoChatSection';

export default function VideoAnalysisPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectValue, setSelectValue] = useState<string>('all');

  const COMMENTS_PER_PAGE = 5;
  const { videoId } = useParams<{ videoId: string }>(); // youtubeId 추출
  const _videoId = String(videoId);

  const {
    data: comments,
    isLoading: commentsLoading,
    isError: commentsError,
  } = useQuery({
    queryKey: ['youtubeComments', videoId],
    queryFn: () => getYoutubeComments(videoId),
    enabled: !!videoId, // videoId가 존재할 때만 실행
  });

  const {
    data: sentiment = [],
    isLoading: sentimentLoading,
    isError: sentimentError,
  } = useQuery({
    queryKey: ['sentiment', comments],
    queryFn: () => postSentiment({ comments: comments || [] }),
    enabled: !!comments && comments.length > 0,
  });

  const filteredSentiment = useMemo(() => {
    switch (selectValue) {
      case 'positive':
        return sentiment.filter((item: { sentiment: string }) => item.sentiment === '긍정');
      case 'negative':
        return sentiment.filter((item: { sentiment: string }) => item.sentiment === '부정');
      case 'neutral':
        return sentiment.filter((item: { sentiment: string }) => item.sentiment === '중립');
      default:
        return sentiment;
    }
  }, [sentiment, selectValue]);

  const sentimentCount = useMemo(() => {
    return sentiment.reduce(
      (acc: { 긍정: number; 부정: number; 중립: number }, cur: { sentiment: string }) => {
        acc[cur.sentiment as keyof typeof acc]++;
        return acc;
      },
      { 긍정: 0, 부정: 0, 중립: 0 }
    );
  }, [sentiment]);

  const totalPages = Math.ceil(filteredSentiment.length / COMMENTS_PER_PAGE);

  const paginatedSentiment = useMemo(() => {
    return filteredSentiment.slice(
      (currentPage - 1) * COMMENTS_PER_PAGE,
      currentPage * COMMENTS_PER_PAGE
    );
  }, [filteredSentiment, currentPage]);

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handleSelectChange = (value: string) => {
    setSelectValue(value);
    setCurrentPage(1);
  };

  if (commentsError || sentimentError) {
    return (
      <Container>
        <ErrorSection>
          <ErrorSection.p>오류가 발생했습니다. 다시 시도 해주세요.</ErrorSection.p>
          <Button asChild>
            <Link href="/">메인으로 돌아가기</Link>
          </Button>
        </ErrorSection>
      </Container>
    );
  }

  return (
    <>
      <Title>
        <Title.h1>Video Analysis</Title.h1>
        <Title.p>YouTube 댓글 감정 분석기</Title.p>
      </Title>

      <VideoChatSection
        loading={commentsLoading || sentimentLoading}
        videoId={_videoId}
        hasData={sentiment.length > 0}
        sentimentCount={{
          positive: sentimentCount.긍정,
          negative: sentimentCount.부정,
          neutral: sentimentCount.중립,
        }}
      />

      <CommentFilter value={selectValue} onChange={handleSelectChange} />

      <div className="flex flex-col w-full items-center justify-center gap-4">
        {commentsLoading || sentimentLoading ? (
          <CommentSkeleton />
        ) : paginatedSentiment.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            <CommentList paginatedSentiment={paginatedSentiment} />

            <CommentPagination
              currentPage={currentPage}
              totalPages={totalPages}
              visiblePages={visiblePages}
              onPageChange={setCurrentPage}
            />
          </div>
        ) : (
          <ErrorSection>
            <ErrorSection.p>분석된 댓글이 없습니다.</ErrorSection.p>
          </ErrorSection>
        )}
      </div>
    </>
  );
}
