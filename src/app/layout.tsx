import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AuthProvider } from '@/context/auth-context';
import { CartProvider } from '@/context/cart-context';

export const metadata: Metadata = {
  title: {
    default: 'EduPro | AI-Powered Career & Learning Platform',
    template: '%s | EduPro',
  },
  description: 'Get AI-powered career guidance with EduPro. We offer personalized course bundles, instant resume analysis, and expert-led online courses to help you achieve your professional goals.',
  keywords: ['AI Learning', 'Online Courses', 'Career Development', 'Resume Analysis', 'Personalized Learning', 'Skill Gap', 'Job Skills', 'UPSC', 'Web Development', 'Soft Skills'],
  authors: [{ name: 'EduPro Team' }],
  openGraph: {
    title: 'EduPro: Unlock Your Career Potential with AI',
    description: 'Get personalized learning paths and expert career guidance. Analyze your resume, find skill gaps, and enroll in courses tailored just for you.',
    url: 'https://edupro-5q9xx.web.app',
    siteName: 'EduPro',
    images: [
      {
        url: 'https://placehold.co/1200x630.png',
        width: 1200,
        height: 630,
        alt: 'EduPro - AI-Powered Career Advancement',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduPro: Unlock Your Career Potential with AI',
    description: 'AI-driven career guidance and personalized online courses. Get your resume analyzed and find the perfect learning path.',
    images: ['https://placehold.co/1200x630.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="1b87uVK69rxeLVBV6Cq-6-IKjw_ejsAa-s3TKrqVRpo" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet"></link>
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
        <AuthProvider>
          <CartProvider>
            <div className="flex flex-col min-h-dvh bg-background">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
