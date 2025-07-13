
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
import { Lock, PlayCircle, IndianRupee, BookOpen } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { CourseSegment, SubTopic } from '@/lib/courses-data';


const useUserCourseData = (courseId: string) => {
    const { user } = useAuth();
    const [enrolledSegments, setEnrolledSegments] = React.useState<Set<string>>(new Set());
    const [loading, setLoading] = React.useState(true);
    const course = courses.find(c => c.id === courseId);

    React.useEffect(() => {
        const fetchUserCourseData = async () => {
            if (user) {
                const userCoursesRef = doc(db, "userCourses", user.uid);
                const docSnap = await getDoc(userCoursesRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const userCourse = data.courses.find((c: any) => c.id === courseId);
                    if (userCourse?.segmentIds) {
                        const allSegmentIds = userCourse.segmentIds.includes('full') 
                            ? new Set(course?.curriculum.flatMap(c => c.subTopics.map(s => s.segmentId)))
                            : new Set(userCourse.segmentIds);
                        setEnrolledSegments(allSegmentIds);
                    }
                }
            } else {
                setEnrolledSegments(new Set());
            }
            setLoading(false);
        };
        fetchUserCourseData();
    }, [user, courseId, course]);

    // For demo purposes, mock ownership of the first sub-topic of the first module
    React.useEffect(() => {
        if (course?.curriculum[0]?.subTopics[0]) {
            const mockEnrolled = new Set<string>([course.curriculum[0].subTopics[0].segmentId]);
            setEnrolledSegments(prev => new Set([...prev, ...mockEnrolled]));
        }
    }, [courseId, course]);

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

  const handleUnlockSegment = (segment: SubTopic) => {
    addToCart(course.id, segment.segmentId);
    router.push('/cart');
  }
  
  const handleUnlockFullCourse = () => {
    addToCart(course.id);
    router.push('/cart');
  }

  const totalSubTopics = course.curriculum.reduce((acc, curr) => acc + curr.subTopics.length, 0);

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
                  You have unlocked {enrolledSegments.size} of {totalSubTopics} topics.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="multiple" className="w-full" defaultValue={['item-0']}>
                    {course.curriculum.map((item, index) => (
                         <AccordionItem key={index} value={`item-${index}`} className="bg-background">
                            <AccordionTrigger className="px-4 text-left">
                               <div className="flex items-center justify-between w-full">
                                    <span className="font-semibold">{item.title}</span>
                                    <span className="text-sm text-muted-foreground">{item.duration}</span>
                               </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 pb-0">
                                <ul className="space-y-1">
                                    {item.subTopics.map((subTopic, subIndex) => {
                                        const isUnlocked = enrolledSegments.has(subTopic.segmentId);
                                        return (
                                            <li key={subIndex} className={`flex items-center justify-between p-2 rounded-md ${isUnlocked ? 'hover:bg-muted/50 cursor-pointer' : ''}`}>
                                                <div className="flex items-start gap-3">
                                                    {isUnlocked ? <PlayCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" /> : <Lock className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />}
                                                    <div>
                                                        <h4 className={`font-medium ${!isUnlocked ? 'text-muted-foreground' : ''}`}>{subTopic.title}</h4>
                                                    </div>
                                                </div>
                                                {!isUnlocked && (
                                                    <Button size="sm" variant="ghost" className="h-auto px-2 py-1" onClick={() => handleUnlockSegment(subTopic)}>
                                                        <IndianRupee className="mr-1 h-3 w-3" /> {subTopic.price}
                                                    </Button>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                {enrolledSegments.size < totalSubTopics && (
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
