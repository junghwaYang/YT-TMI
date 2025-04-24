import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('container mx-auto px-4 py-8', className)}>
      {children}
    </div>
  );
}
