"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id;

  // In a real app, you would fetch course details based on the id
  const courseTitle = `Details for Course: ${id}`;
  const courseDescription = `(Full course info, curriculum, instructor bio, and reviews will be displayed here. This is a placeholder page.)`;

  return (
    <div className="container py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">{courseTitle}</CardTitle>
          <CardDescription>Start your learning journey today!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
             <Image 
                src="https://placehold.co/1280x720.png" 
                alt="Video placeholder" 
                width={1280} 
                height={720}
                className="rounded-lg object-cover"
                data-ai-hint="video player"
              />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-headline">About This Course</h2>
            <p className="text-muted-foreground mt-2">
              {courseDescription}
            </p>
          </div>
          <div className="pt-4">
             {/* 
                TODO: Implement Firebase Auth check.
                If user is not logged in, clicking this button should redirect to '/login'.
                If logged in, it should trigger a function to add the course to the user's data in Firestore
                and then redirect to '/dashboard'.
              */}
            <Button size="lg" asChild>
                <Link href="/dashboard">Buy Course - ₹499</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
