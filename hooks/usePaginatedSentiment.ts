import { useMemo } from 'react';

import getVisiblePages from '@/lib/getVisiblePages';

export function usePaginatedSentiment(
  sentiment: { text: string; sentiment: string }[],
  selectValue: string,
  currentPage: number,
  perPage: number
) {
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
        acc[cur.sentiment as keyof typeof acc]++;
        return acc;
      },
      { 긍정: 0, 부정: 0, 중립: 0 }
    );
  }, [sentiment]);

  const totalPages = Math.ceil(filteredSentiment.length / perPage);

  const paginatedSentiment = useMemo(() => {
    return filteredSentiment.slice((currentPage - 1) * perPage, currentPage * perPage);
  }, [filteredSentiment, currentPage, perPage]);

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return {
    filteredSentiment,
    paginatedSentiment,
    sentimentCount,
    totalPages,
    visiblePages,
  };
}
