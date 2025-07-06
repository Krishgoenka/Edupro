
"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { courses } from '@/lib/courses-data';
import type { Course } from '@/lib/courses-data';
import { IndianRupee } from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useCart();
  
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
        <div className="container py-12 text-center">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <p>Sorry, we couldn't find the course you were looking for.</p>
        </div>
    )
  }

  return (
    <div className="container py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">{course.title}</CardTitle>
          <CardDescription>Start your learning journey today!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
             <Image 
                src={course.image} 
                alt={course.title}
                width={1280} 
                height={720}
                className="rounded-lg object-cover"
                data-ai-hint={course.dataAiHint}
              />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-headline">About This Course</h2>
            <p className="text-muted-foreground mt-2">
              {course.description}
            </p>
          </div>
          <div className="pt-4 flex items-center gap-6">
            <Button size="lg" onClick={() => addToCart(course as Course)}>
              Add to Cart
            </Button>
            <p className="text-3xl font-bold font-headline flex items-center"><IndianRupee className="h-7 w-7" />{course.price}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
