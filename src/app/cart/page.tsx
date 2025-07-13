
"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart, CartItem } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IndianRupee, Trash2, ShoppingCart, Tag, CheckCircle, Unlock, Info, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { AiRecommender } from '@/components/ai-recommender';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { courses as allCourses, Course } from '@/lib/courses-data';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, addMultipleToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);

  const getCourseData = (cartItem: CartItem) => {
    const course = allCourses.find(c => c.id === cartItem.courseId);
    if (!course) return null;

    const isFullCourse = cartItem.segmentIds.has('full') || cartItem.segmentIds.size === course.curriculum.flatMap(c => c.subTopics).length;
    const price = isFullCourse
        ? course.price
        : course.curriculum.flatMap(c => c.subTopics).reduce((acc, seg) => cartItem.segmentIds.has(seg.segmentId) ? acc + seg.price : acc, 0);

    const includedSegments = isFullCourse
        ? course.curriculum.flatMap(c => c.subTopics)
        : course.curriculum.flatMap(c => c.subTopics).filter(seg => cartItem.segmentIds.has(seg.segmentId));

    return { ...course, cartPrice: price, isFullCourse, includedSegments };
  };

  const cartDetails = useMemo(() => cart.map(getCourseData).filter(Boolean) as (Course & { cartPrice: number, isFullCourse: boolean, includedSegments: any[] })[], [cart]);

  const handleRemove = (courseId: string) => {
    removeFromCart(courseId);
    setIsCouponApplied(false);
  };

  const subtotal = useMemo(() => cartDetails.reduce((acc, course) => acc + course.cartPrice, 0), [cartDetails]);
  const total = isCouponApplied ? 0 : subtotal;

  const handleCheckout = async () => {
    if (!user) {
        toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "You must be logged in to complete a purchase.",
        });
        router.push('/login');
        return;
    }

    if (total === 0 && cart.length > 0 && isCouponApplied) {
        const userCoursesRef = doc(db, 'userCourses', user.uid);

        try {
            const docSnap = await getDoc(userCoursesRef);
            const existingCourses = docSnap.exists() ? docSnap.data().courses : [];
            const existingCourseMap = new Map(existingCourses.map((c: any) => [c.courseId, new Set(c.segmentIds)]));

            cart.forEach(cartItem => {
                const currentSegments = existingCourseMap.get(cartItem.courseId) || new Set();
                cartItem.segmentIds.forEach(segId => currentSegments.add(segId));
                existingCourseMap.set(cartItem.courseId, currentSegments);
            });
            
            const updatedCourses = Array.from(existingCourseMap.entries()).map(([courseId, segmentIdsSet]) => ({
                courseId,
                segmentIds: Array.from(segmentIdsSet),
            }));

            await setDoc(userCoursesRef, { courses: updatedCourses });
            
            clearCart();
            setShowSuccessOverlay(true);
            setTimeout(() => {
                setShowSuccessOverlay(false);
                router.push("/dashboard");
            }, 2000);

        } catch (error) {
             console.error("Error during checkout:", error);
             toast({
                variant: "destructive",
                title: "Purchase Failed",
                description: "Could not save your course progress. Please try again.",
             });
        }

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
      toast({ title: "Coupon Applied!", description: "Your order is now free." });
    } else if (coupon.trim() !== '') {
      setIsCouponApplied(false);
      toast({ title: "Invalid Coupon", description: `The coupon "${coupon}" is not valid.`, variant: "destructive" });
    } else {
      setIsCouponApplied(false);
      toast({ title: "Please enter a coupon code." });
    }
  };
  
  const handleUnlockFullCourse = (courseId: string) => {
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;

    const fullCourseSegments = course.curriculum.flatMap(c => c.subTopics.map(s => s.segmentId));
    addMultipleToCart([{ courseId, segmentIds: fullCourseSegments }]);
  }

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
                <CardTitle>Cart Items ({cartDetails.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {cartDetails.map(course => (
                    <li key={course.id} className="flex flex-col sm:flex-row items-start gap-4 p-4 border rounded-lg">
                      <Image
                        src={course.image}
                        alt={course.title}
                        width={120}
                        height={80}
                        className="rounded-md object-cover flex-shrink-0"
                        data-ai-hint={course.dataAiHint}
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">{course.category}</p>
                        {!course.isFullCourse && (
                            <div className="mt-2 text-xs bg-primary/10 p-2 rounded-md">
                               <p className="font-bold text-primary flex items-center gap-1.5"><Info className="h-4 w-4" /> Purchasing {course.includedSegments.length} of {course.curriculum.flatMap(c => c.subTopics).length} topics:</p>
                               <ul className="list-disc list-inside pl-4 mt-1 text-muted-foreground">
                                   {course.includedSegments.map(seg => <li key={seg.segmentId}>{seg.title}</li>)}
                               </ul>
                               <Button size="sm" variant="link" className="p-0 h-auto mt-2" onClick={() => handleUnlockFullCourse(course.id)}>
                                 <Unlock className="mr-2 h-3 w-3" /> Unlock full course for ₹{course.price}?
                               </Button>
                           </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 self-center sm:self-start">
                        <p className="font-semibold flex items-center">
                          <IndianRupee className="h-4 w-4" />
                          {course.cartPrice}
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
                 {!user && (
                    <div className="flex items-center gap-3 bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-md border border-yellow-300 dark:border-yellow-700">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">
                            Please <Link href="/login" className="font-bold underline">log in</Link> to checkout.
                        </p>
                    </div>
                 )}

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
                            disabled={!user}
                        />
                        <Button variant="secondary" onClick={handleApplyCoupon} disabled={!user}>Apply</Button>
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
                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={!user}>
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
