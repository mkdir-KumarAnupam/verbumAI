import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/Navbar';
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LinguaFlash - Learn Languages Fast',
  description: 'Master languages faster with AI-generated flashcards tailored for your learning needs.',
};

// **Force dynamic rendering to allow Clerk authentication**
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <header>
            <SignedOut>
            
              {children}
            </SignedOut>
            <SignedIn>
              {children}
            </SignedIn>
            
          </header>

        </body>
      </html>
    </ClerkProvider>
  );
}