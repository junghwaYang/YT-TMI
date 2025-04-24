import { ReactNode } from 'react';

function Title({ children }: { children: ReactNode }) {
  return <div className="mb-8 space-y-4 text-center">{children}</div>;
}

Title.h1 = function H1({ children }: { children: ReactNode }) {
  return <h1 className="font-bold text-4xl">{children}</h1>;
};

Title.p = function P({ children }: { children: ReactNode }) {
  return <p className="text-gray-500 text-base">{children}</p>;
};

export default Title;
