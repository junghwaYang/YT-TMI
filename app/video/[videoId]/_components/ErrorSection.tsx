import { ReactNode } from 'react';

function ErrorSection({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center w-full h-full py-20">
      {children}
    </div>
  );
}

ErrorSection.p = function P({ children }: { children: ReactNode }) {
  return <p className="text-lg text-gray-500">{children}</p>;
};

export default ErrorSection;
