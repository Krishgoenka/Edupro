
"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { IndianRupee, Trash2, ShoppingCart, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { AiRecommender } from '@/components/ai-recommender';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const handleRemove = (courseId: string) => {
    removeFromCart(courseId);
    setIsCouponApplied(false);
  };

  const subtotal = useMemo(() => cart.reduce((acc, course) => acc + course.price, 0), [cart]);
  
  const total = isCouponApplied ? 0 : subtotal;

  const handleCheckout = () => {
    // Check if the cart is not empty and the total is 0 due to the coupon
    if (total === 0 && cart.length > 0 && isCouponApplied) {
        // In a real app, you would add these courses to the user's enrolled list in Firestore.
        clearCart();
        toast({
            title: "Courses Purchased!",
            description: "Your new courses are now available on your dashboard.",
        });
        router.push("/dashboard");
    } else {
        // This is where payment gateway logic would be triggered for non-free checkouts.
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
    </div>
  );
}
