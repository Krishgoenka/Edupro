
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';
import { useSplash } from '@/context/splash-context';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogOut, ShoppingCart, User as UserIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function Header() {
  const { user } = useAuth();
  const { cart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const { triggerSplash } = useSplash();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  const navLinks = [
    { href: "/courses", label: "Courses" },
    { href: "/resume", label: "Resume Advisor" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2" onClick={triggerSplash}>
            <Image src="/icon.jpg" alt="EduPro Logo" width={28} height={28} className="rounded-md" />
            <span className="font-bold font-headline">
              EduPro
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {cart.length}
                  </span>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Link>
            </Button>
            {user ? (
               <Link href="/profile">
                  <Avatar className="h-9 w-9 cursor-pointer">
                      <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                      <AvatarFallback>
                          {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="h-5 w-5" />}
                      </AvatarFallback>
                  </Avatar>
                </Link>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link href="/login">Log In</Link>
                </Button>
                <Button asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="p-4">
                  <nav className="flex flex-col gap-4">
                     {user && (
                      <Link href="/profile" className="text-lg font-medium flex items-center gap-3">
                         <Avatar className="h-8 w-8">
                            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                            <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                         </Avatar>
                         Profile
                      </Link>
                     )}
                    {navLinks.map(link => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium"
                      >
                        {link.label}
                      </Link>
                    ))}
                     <Link href="/cart" className="text-lg font-medium">
                        Cart ({cart.length})
                     </Link>
                  </nav>
                  <div className="mt-6 flex flex-col gap-2">
                    {user ? (
                       <Button onClick={handleLogout}>
                         <LogOut className="mr-2 h-4 w-4" />
                         Log Out
                       </Button>
                    ) : (
                      <>
                        <Button asChild variant="ghost">
                          <Link href="/login">Log In</Link>
                        </Button>
                        <Button asChild>
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
