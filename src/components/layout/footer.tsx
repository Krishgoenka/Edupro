import Link from "next/link";
import Image from "next/image";
import { Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 text-center md:flex-row md:justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Image src="/icon.jpg" alt="EduPro Logo" width={20} height={20} className="rounded-md" />
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <strong>EduPro. All rights reserved.</strong>
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-primary">About</Link>
            <Link href="/contact" className="hover:text-primary">Contact</Link>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
        </div>
      </div>
    </footer>
  );
}
