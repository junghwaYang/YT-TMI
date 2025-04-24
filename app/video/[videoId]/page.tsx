'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import Container from '@/components/layout/Container';
import Title from '@/components/layout/Title';
import { Button } from '@/components/ui/button';
import { usePaginatedSentiment } from '@/hooks/usePaginatedSentiment';
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

  const { paginatedSentiment, sentimentCount, totalPages, visiblePages } = usePaginatedSentiment(
    sentiment,
    selectValue,
    currentPage,
    COMMENTS_PER_PAGE
  );

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

      <CommentFilter
        value={selectValue}
        onChange={value => {
          setSelectValue(value);
          setCurrentPage(1);
        }}
      />

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
