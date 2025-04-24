'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

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
  const [comments, setComments] = useState<string[]>([]); // 댓글 상태 추가
  const [sentiment, setSentiment] = useState<
    { text: string; sentiment: '긍정' | '부정' | '중립' }[]
  >([]); // 감정 상태

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectValue, setSelectValue] = useState<string>('all');

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const COMMENTS_PER_PAGE = 5;
  const { videoId } = useParams<{ videoId: string }>(); // youtubeId 추출
  const _videoId = String(videoId);

  const filteredSentiment = useMemo(() => {
    switch (selectValue) {
      case 'positive':
        return sentiment.filter(item => item.sentiment === '긍정');
      case 'negative':
        return sentiment.filter(item => item.sentiment === '부정');
      case 'neutral':
        return sentiment.filter(item => item.sentiment === '중립');
      default:
        return sentiment;
    }
  }, [sentiment, selectValue]);

  const sentimentCount = useMemo(() => {
    return sentiment.reduce(
      (acc, cur) => {
        acc[cur.sentiment]++;
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

  useEffect(() => {
    // 댓글 가져오기
    const fetchComments = async () => {
      try {
        const res = await getYoutubeComments(_videoId);
        setComments(res);
        setError(false);
      } catch (err) {
        setError(true);
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [_videoId]);

  useEffect(() => {
    // 감정 분석하기
    const fetchSentiment = async () => {
      if (comments.length === 0) return;
      setLoading(true);
      try {
        const res = await postSentiment({ comments: comments });
        setSentiment(res);
        setError(false);
      } catch (err) {
        setError(true);
        console.error('Error fetching sentiment:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSentiment();
  }, [comments]);

  if (error) {
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
        loading={loading}
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
        {loading ? (
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
