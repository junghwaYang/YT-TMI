import { Loader2 } from 'lucide-react';

import { CommentChart } from '@/components/CommentChart';
import VideoEmbed from '@/components/VideoEmbed';

import ErrorSection from './ErrorSection';

interface Props {
  loading: boolean;
  videoId: string;
  hasData: boolean;
  sentimentCount: { positive: number; negative: number; neutral: number };
}

export default function VideoChatSection({ loading, videoId, hasData, sentimentCount }: Props) {
  return (
    <div className="w-full flex items-center justify-between mb-8 gap-4 flex-col xl:flex-row xl:h-[395px]">
      <VideoEmbed videoId={String(videoId)} />
      {loading ? (
        <div className="flex items-center justify-center w-full py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : hasData ? (
        <CommentChart {...sentimentCount} />
      ) : (
        <ErrorSection>
          <ErrorSection.p>댓글이 존재하지 않습니다.</ErrorSection.p>
        </ErrorSection>
      )}
    </div>
  );
}
