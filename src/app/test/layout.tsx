import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'react-scroll-display-manager test',
  description: 'react-scroll-display-manager test',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  );
}
