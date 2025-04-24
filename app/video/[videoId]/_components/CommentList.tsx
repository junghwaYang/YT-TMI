import { cn } from '@/lib/utils';

export default function CommentList({
  paginatedSentiment,
}: {
  paginatedSentiment: { text: string; sentiment: string }[];
}) {
  return (
    <ul className="w-full space-y-2">
      {paginatedSentiment.map((item, index) => (
        <li key={index} className="flex items-center gap-2 border p-3 rounded bg-gray-50 w-full">
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
  );
}
