
"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { courses } from '@/lib/courses-data';

// TODO: Fetch comments from Firestore based on the course ID.
const comments = [
    { user: 'Alice', timestamp: '2 days ago', text: 'Great explanation of hooks!', avatar: 'https://placehold.co/40x40.png', dataAiHint: "user avatar" },
    { user: 'Bob', timestamp: '1 day ago', text: 'I had a question about the server components part.', avatar: 'https://placehold.co/40x40.png', dataAiHint: "user avatar" },
];

export default function CourseVideoPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
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
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {course.curriculum.map((item, index) => (
                         <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                               <div className="flex items-center justify-between w-full gap-4">
                                    <span className='flex-1'>{item.title}</span>
                                    <span className="text-sm text-muted-foreground flex-shrink-0">{item.duration}</span>
                               </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                (Placeholder for module links/content)
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
