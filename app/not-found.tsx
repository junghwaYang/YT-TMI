import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 gap-6">
      <h1 className="text-4xl font-bold">404 - 페이지를 찾을 수 없습니다.</h1>
      <p className="text-muted-foreground">
        존재하지 않는 주소를 요청하셨습니다.
      </p>

      <Button asChild>
        <Link href="/">메인으로 돌아가기</Link>
      </Button>
    </div>
  );
}
