import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'react-scroll-display-manager test1',
  description: 'react-scroll-display-manager test1',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  );
}
