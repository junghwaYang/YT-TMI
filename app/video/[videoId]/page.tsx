'use client';

import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { CommentChart } from '@/components/CommentChart';
import Container from '@/components/layout/Container';
import Title from '@/components/layout/Title';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import VideoEmbed from '@/components/VideoEmbed';
import getVisiblePages from '@/lib/getVisiblePages';
import { getYoutubeComments } from '@/lib/getYoutubeComments';
import { postSentiment } from '@/lib/postSentiment';
import { cn } from '@/lib/utils';

export default function VideoAnalysisPage() {
  const [comments, setComments] = useState<string[]>([]); // 댓글 상태 추가
  const [sentiment, setSentiment] = useState<
    { text: string; sentiment: '긍정' | '부정' | '중립' }[]
  >([]); // 감정 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [selectValue, setSelectValue] = useState('all');
  const [selectFilter, setSelectFilter] = useState<
    { text: string; sentiment: '긍정' | '부정' | '중립' }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const COMMENTS_PER_PAGE = 5;
  const param = useParams();
  const { videoId } = param; // youtubeId 추출

  const 긍정수 = sentiment.filter(item => item.sentiment === '긍정').length;
  const 부정수 = sentiment.filter(item => item.sentiment === '부정').length;
  const 중립수 = sentiment.filter(item => item.sentiment === '중립').length;

  const totalPages = Math.ceil(selectFilter.length / COMMENTS_PER_PAGE);
  const paginatedSentiment = selectFilter.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handleSelectChange = (value: string) => {
    setSelectValue(value);
    setCurrentPage(1);
    switch (value) {
      case 'positive':
        setSelectFilter(sentiment.filter(item => item.sentiment === '긍정'));
        break;
      case 'negative':
        setSelectFilter(sentiment.filter(item => item.sentiment === '부정'));
        break;
      case 'neutral':
        setSelectFilter(sentiment.filter(item => item.sentiment === '중립'));
        break;
      default:
        setSelectFilter(sentiment);
    }
  };

  useEffect(() => {
    // 댓글 가져오기
    const fetchComments = async () => {
      try {
        const res = await getYoutubeComments(String(videoId));
        setComments(res);
        setError(false);
      } catch (err) {
        setError(true);
        console.error('Error fetching comments:', err);
      }
    };

    fetchComments();
  }, [videoId]);

  useEffect(() => {
    // 감정 분석하기
    const fetchSentiment = async () => {
      if (comments.length === 0) return;
      setLoading(true);
      try {
        const res = await postSentiment({ comments });
        setSentiment(res);
        setSelectFilter(res);
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
        <div className="flex flex-col gap-4 items-center justify-center w-full h-full py-20">
          <p className="text-lg text-gray-500">
            댓글을 가져오는 중 오류가 발생했습니다. 다시 시도 해주세요.
          </p>
          <Button asChild>
            <Link href="/">메인으로 돌아가기</Link>
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Title>
        <Title.h1>Video Analysis</Title.h1>
        <Title.p>YouTube 댓글 감정 분석기</Title.p>
      </Title>

      <div className="w-full flex items-center justify-between mb-8 gap-4 flex-col xl:flex-row xl:h-[395px]">
        <VideoEmbed videoId={String(videoId)} />
        {loading ? (
          <div className="flex items-center justify-center w-full py-16">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : sentiment.length > 0 ? (
          <CommentChart 긍정수={긍정수} 부정수={부정수} 중립수={중립수} />
        ) : (
          <div className="flex items-center justify-center w-full h-full py-20">
            <p className="text-lg text-gray-500">댓글이 존재하지 않습니다.</p>
          </div>
        )}
      </div>
      <div className="flex justify-end mb-4">
        <Select
          defaultValue="all"
          onValueChange={handleSelectChange}
          value={selectValue}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="positive">긍정적</SelectItem>
              <SelectItem value="negative">부정적</SelectItem>
              <SelectItem value="neutral">중립</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col w-full items-center justify-center gap-4">
        {loading ? (
          <ul className="w-full space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <li
                key={i}
                className="flex items-center gap-2 border p-3 rounded bg-gray-50 w-full"
              >
                <Skeleton className="h-4 w-full rounded" />
              </li>
            ))}
          </ul>
        ) : paginatedSentiment.length > 0 ? (
          <div className="flex flex-col items-center w-full">
            <ul className="w-full space-y-2">
              {paginatedSentiment.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 border p-3 rounded bg-gray-50 w-full"
                >
                  <p
                    className={cn(
                      'relative before:content-[""] before:absolute before:left-0 before:top-2 before:size-2 before:rounded-full pl-4 text-sm',
                      {
                        'before:bg-green-500': item.sentiment === '긍정',
                        'before:bg-red-500': item.sentiment === '부정',
                        'before:bg-yellow-500': item.sentiment === '중립',
                      }
                    )}
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </li>
              ))}
            </ul>

            <Pagination className="my-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={e => {
                      e.preventDefault();
                      setCurrentPage(p => Math.max(1, p - 1));
                    }}
                    className={
                      currentPage === 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>

                {visiblePages.map(page => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={e => {
                        e.preventDefault();
                        setCurrentPage(page);
                      }}
                      isActive={page === currentPage}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={e => {
                      e.preventDefault();
                      setCurrentPage(p => Math.min(totalPages, p + 1));
                    }}
                    className={
                      currentPage === totalPages
                        ? 'pointer-events-none opacity-50'
                        : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full py-20">
            <p className="text-lg text-gray-500 ">분석된 댓글이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}
