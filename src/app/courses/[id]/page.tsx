"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="container py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Course Detail Page</CardTitle>
          <CardDescription>Details for Course ID: {id}</CardDescription>
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
              (Full course info, curriculum, instructor bio, and reviews will be displayed here. This is a placeholder page.)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
