
"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { courses } from '@/lib/courses-data';
import { Lock, PlayCircle, IndianRupee } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { CourseSegment } from '@/lib/courses-data';


// This should be replaced with real user course data fetching
const useUserCourseData = (courseId: string) => {
    const { user } = useAuth();
    const [enrolledSegments, setEnrolledSegments] = React.useState<Set<string>>(new Set());
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchUserCourseData = async () => {
            if (user) {
                // Mock: In a real app, fetch from Firestore
                const userCoursesRef = doc(db, "userCourses", user.uid);
                const docSnap = await getDoc(userCoursesRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const userCourse = data.courses.find((c: any) => c.id === courseId);
                    if (userCourse && userCourse.segmentIds) {
                        setEnrolledSegments(new Set(userCourse.segmentIds));
                    } else if (userCourse) {
                        // For backwards compatibility, assume full course if segmentIds is missing
                        const fullCourse = courses.find(c => c.id === courseId);
                        setEnrolledSegments(new Set(fullCourse?.curriculum.map(s => s.segmentId)));
                    }
                }
            } else {
                // Mock: In a real app, check localStorage
                 setEnrolledSegments(new Set());
            }
            setLoading(false);
        };
        fetchUserCourseData();
    }, [user, courseId]);

    // For demo purposes, we'll mock that the user owns some segments
    React.useEffect(() => {
        const course = courses.find(c => c.id === courseId);
        if (course) {
             const mockEnrolled = new Set<string>();
             // Let's say user owns the first segment of every course by default for demo
             if(course.curriculum.length > 0) {
                 mockEnrolled.add(course.curriculum[0].segmentId);
             }
             setEnrolledSegments(mockEnrolled);
        }
    }, [courseId]);


    return { enrolledSegments, loading };
}


// TODO: Fetch comments from Firestore based on the course ID.
const comments = [
    { user: 'Alice', timestamp: '2 days ago', text: 'Great explanation of hooks!', avatar: 'https://placehold.co/40x40.png', dataAiHint: "user avatar" },
    { user: 'Bob', timestamp: '1 day ago', text: 'I had a question about the server components part.', avatar: 'https://placehold.co/40x40.png', dataAiHint: "user avatar" },
];

export default function CourseVideoPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const course = courses.find(c => c.id === id);

  const { enrolledSegments } = useUserCourseData(id);

  if (!course) {
    return (
        <div className="container py-12 text-center">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <p>Sorry, we couldn't find the course you were looking for.</p>
        </div>
    )
  }

  const handleUnlockSegment = (segment: CourseSegment) => {
    addToCart(course.id, segment.segmentId);
    router.push('/cart');
  }
  
  const handleUnlockFullCourse = () => {
    addToCart(course.id);
    router.push('/cart');
  }

  return (
    <div className="container py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6 shadow-lg">
                <iframe
                    className="w-full h-full"
                    src={course.videoUrl}
                    title={course.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">{course.title}</CardTitle>
                    <CardDescription className="text-lg">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Separator className="my-6" />
                    <h3 className="text-2xl font-bold font-headline mb-4">Comments</h3>
                    <div className="space-y-6">
                        {/* TODO: Implement form handling and save comments to Firestore */}
                        <div className="space-y-2">
                            <Textarea placeholder="Add your comment..."/>
                            <Button>Post Comment</Button>
                        </div>
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <Avatar>
                                        <AvatarImage src={comment.avatar} alt={comment.user} data-ai-hint={comment.dataAiHint} />
                                        <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold">{comment.user} <span className="text-sm font-normal text-muted-foreground ml-2">{comment.timestamp}</span></p>
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 lg:sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
               <CardDescription>
                  You have unlocked {enrolledSegments.size} of {course.curriculum.length} modules.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
                    {course.curriculum.map((item, index) => {
                        const isUnlocked = enrolledSegments.has(item.segmentId);
                        return (
                         <AccordionItem key={index} value={`item-${index}`} disabled={!isUnlocked}>
                            <AccordionTrigger className="text-left" disabled={!isUnlocked}>
                               <div className="flex items-center justify-between w-full gap-4">
                                    <div className="flex items-center gap-2">
                                        {isUnlocked ? <PlayCircle className="h-5 w-5 text-green-500" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                                        <span className={`flex-1 ${!isUnlocked ? 'text-muted-foreground' : ''}`}>{item.title}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground flex-shrink-0">{item.duration}</span>
                               </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                {isUnlocked ? (
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                ) : (
                                    <div className="flex flex-col items-start gap-2 p-2 bg-muted rounded-md">
                                        <p className="text-sm font-semibold">This topic is locked.</p>
                                        <Button size="sm" onClick={() => handleUnlockSegment(item)}>
                                            <IndianRupee className="mr-2 h-4 w-4" /> Unlock for ₹{item.price}
                                        </Button>
                                    </div>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    )})}
                </Accordion>
                {enrolledSegments.size < course.curriculum.length && (
                    <div className="mt-4 p-4 border-t">
                        <Button className="w-full" onClick={handleUnlockFullCourse}>Unlock Full Course for ₹{course.price}</Button>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
