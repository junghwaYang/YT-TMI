import { Skeleton } from '@/components/ui/skeleton';

export default function CommentSkeleton() {
  return (
    <ul className="w-full space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex items-center gap-2 border p-3 rounded bg-gray-50 w-full">
          <Skeleton className="h-4 w-full rounded" />
        </li>
      ))}
    </ul>
  );
}
