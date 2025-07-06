"use client";

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleBuyCourse = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to purchase a course.",
      });
      router.push("/login");
    } else {
      // TODO: Add to firestore
      toast({
        title: "Success!",
        description: "Course added to your dashboard.",
      });
      router.push("/dashboard");
    }
  };

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
            <Button size="lg" onClick={handleBuyCourse}>
              Buy Course - ₹499
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
