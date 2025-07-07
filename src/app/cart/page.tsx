
"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IndianRupee, Trash2, ShoppingCart, Tag, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { AiRecommender } from '@/components/ai-recommender';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const handleRemove = (courseId: string) => {
    removeFromCart(courseId);
    setIsCouponApplied(false);
  };

  const subtotal = useMemo(() => cart.reduce((acc, course) => acc + course.price, 0), [cart]);
  
  const total = isCouponApplied ? 0 : subtotal;

  const handleCheckout = async () => {
    if (total === 0 && cart.length > 0 && isCouponApplied) {
        const courseIdsToAdd = cart.map(c => c.id);

        if (user) {
            const userCoursesRef = doc(db, 'userCourses', user.uid);
            const docSnap = await getDoc(userCoursesRef);
            if (docSnap.exists()) {
                await updateDoc(userCoursesRef, { courseIds: arrayUnion(...courseIdsToAdd) });
            } else {
                await setDoc(userCoursesRef, { courseIds: courseIdsToAdd });
            }
        } else {
            const localEnrolled = localStorage.getItem('guestEnrolledCourses');
            const currentIds = localEnrolled ? JSON.parse(localEnrolled) : [];
            const newIds = [...new Set([...currentIds, ...courseIdsToAdd])];
            localStorage.setItem('guestEnrolledCourses', JSON.stringify(newIds));
        }
        
        clearCart();

        setShowSuccessOverlay(true);
        setTimeout(() => {
            setShowSuccessOverlay(false);
            router.push("/dashboard");
        }, 2000);

    } else {
        toast({
          title: "This feature is not yet available",
          description: "We're working on integrating a secure payment gateway.",
        });
    }
  };

  const handleApplyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'TESTFREE') {
      setIsCouponApplied(true);
      toast({
        title: "Coupon Applied!",
        description: "Your order is now free.",
      });
    } else if (coupon.trim() !== '') {
      setIsCouponApplied(false);
      toast({
        title: "Invalid Coupon",
        description: `The coupon "${coupon}" is not valid.`,
        variant: "destructive",
      });
    } else {
      setIsCouponApplied(false);
      toast({
        title: "Please enter a coupon code."
      });
    }
  };

  return (
    <div className="container py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline flex items-center gap-4">
          <ShoppingCart className="h-10 w-10" />
          Your Shopping Cart
        </h1>
      </div>

      {cart.length === 0 ? (
        <Card className="flex items-center justify-center py-20">
          <CardContent className="text-center">
            <p className="text-muted-foreground text-lg">Your cart is empty.</p>
            <Button asChild className="mt-4">
              <Link href="/courses">Explore Courses</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Cart Items ({cart.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {cart.map(course => (
                    <li key={course.id} className="flex items-center gap-4">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={120}
                        height={80}
                        className="rounded-md object-cover"
                        data-ai-hint={course.dataAiHint}
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.category}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-semibold flex items-center">
                          <IndianRupee className="h-4 w-4" />
                          {course.price}
                        </p>
                        <Button variant="ghost" size="icon" onClick={() => handleRemove(course.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

             <Card>
                <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className='text-center sm:text-left'>
                        <h3 className="text-lg font-semibold font-headline">Want to learn more?</h3>
                        <p className="text-sm text-muted-foreground">Explore more courses or get a personalized bundle from our AI.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Button asChild variant="outline" className='w-full'>
                            <Link href="/courses">Explore Courses</Link>
                        </Button>
                        <AiRecommender />
                    </div>
                </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className='flex items-center'><IndianRupee className="h-4 w-4" />{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Taxes & Fees</span>
                  <span>{isCouponApplied ? 'Free' : 'Calculated at checkout'}</span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                    <label htmlFor="coupon" className="text-sm font-medium flex items-center gap-2">
                        <Tag className="h-4 w-4 text-muted-foreground"/>
                        Coupon Code
                    </label>
                    <div className="flex space-x-2">
                        <Input 
                            id="coupon" 
                            placeholder="Enter coupon" 
                            value={coupon} 
                            onChange={(e) => {
                                setCoupon(e.target.value)
                                if (isCouponApplied) setIsCouponApplied(false);
                            }}
                        />
                        <Button variant="secondary" onClick={handleApplyCoupon}>Apply</Button>
                    </div>
                    {isCouponApplied && (
                        <p className="text-sm text-green-600 font-medium pt-1">"TESTFREE" applied! Your order is free.</p>
                    )}
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className='flex items-center'><IndianRupee className="h-5 w-5" />{total}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  {total === 0 && cart.length > 0 ? 'Get for Free' : 'Proceed to Checkout'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      {showSuccessOverlay && (
        <div className="fixed inset-0 bg-background/90 flex items-center justify-center z-50">
          <div className="text-center">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto animate-pulse" />
            <h2 className="text-2xl font-bold mt-4 font-headline text-primary">Courses Purchased!</h2>
            <p className="text-muted-foreground">You will be redirected to your dashboard.</p>
          </div>
        </div>
      )}
    </div>
  );
}
