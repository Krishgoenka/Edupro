"use client";

import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export function Header() {
  const scrollTo = (selector: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">
              EduPro
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="#features"
              onClick={scrollTo('#features')}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              onClick={scrollTo('#testimonials')}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Testimonials
            </Link>
             <Link
              href="#about"
              onClick={scrollTo('#about')}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              About
            </Link>
            <Link
              href="#contact"
              onClick={scrollTo('#contact')}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <Button
            onClick={() => {
              const heroElement = document.getElementById('hero');
              if (heroElement) {
                heroElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
