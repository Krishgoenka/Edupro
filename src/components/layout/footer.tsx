import Link from "next/link";
import { Icons } from '@/components/icons';
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icons.logo className="h-5 w-5 text-primary" />
          <p>
            &copy; {new Date().getFullYear()} EduPro. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary">About</Link>
            <a href="mailto:eduproesd@gmail.com" className="hover:text-primary">Contact</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
        </div>
      </div>
    </footer>
  );
}
