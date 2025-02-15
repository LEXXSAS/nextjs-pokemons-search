'use client';

import { SessionProvider } from 'next-auth/react';

export const AuthProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
    <SessionProvider>{children}</SessionProvider>
    </>
  )
}
