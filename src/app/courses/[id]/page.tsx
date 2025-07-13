
"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCart } from '@/context/cart-context';
import { courses } from '@/lib/courses-data';
import type { Course, SubTopic } from '@/lib/courses-data';
import { IndianRupee, Clock, BarChart2, CheckCircle, Video, FileText, Infinity as InfinityIcon, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function CourseDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const course = courses.find(c => c.id === id);

  if (!course) {
    return (
        <div className="container py-12 text-center">
            <h1 className="text-2xl font-bold">Course not found</h1>
            <p>Sorry, we couldn't find the course you were looking for.</p>
        </div>
    )
  }

  const handleAddToCart = (course: Course) => {
    addToCart(course.id, undefined, true);
    toast({
        title: "Added to Cart!",
        description: `${course.title} has been added to your cart.`
    });
  }

  return (
    <div className="bg-muted/40">
      <div className="bg-background">
        <div className="container py-8 md:py-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="text-sm text-muted-foreground">
                <Link href="/courses" className="hover:text-primary">Courses</Link> &gt; <span>{course.domain}</span>
            </div>
            <h1 className="text-4xl font-bold font-headline">{course.title}</h1>
            <p className="text-lg text-muted-foreground">{course.description}</p>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={course.tutor.image} alt={course.tutor.name} data-ai-hint={course.tutor.dataAiHint} />
                <AvatarFallback>{course.tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">Created by {course.tutor.name}</p>
              </div>
            </div>
             <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4" />
                    <span>{course.level}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration} of video content</span>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-12 grid lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-12">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-headline">What you'll learn</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 mt-1 text-primary flex-shrink-0"/>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold font-headline">Course curriculum</h2>
                <Accordion type="multiple" className="w-full" defaultValue={['item-0']}>
                    {course.curriculum.map((item, index) => (
                         <AccordionItem key={index} value={`item-${index}`} className="bg-background">
                            <AccordionTrigger className="px-6 text-lg">
                               <div className="flex items-center justify-between w-full">
                                    <span className='font-bold'>{item.title}</span>
                                    <span className="text-sm text-muted-foreground font-normal">{item.duration}</span>
                               </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-0">
                                <ul className="space-y-4">
                                  {item.subTopics && item.subTopics.map((subTopic, subIndex) => (
                                    <li key={subIndex} className="flex items-start gap-3 pb-4 border-b last:border-none">
                                      <BookOpen className="h-5 w-5 text-primary/70 mt-1 flex-shrink-0" />
                                      <div>
                                        <h4 className="font-semibold">{subTopic.title}</h4>
                                        <p className="text-sm text-muted-foreground">{subTopic.description}</p>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>

        <div className="lg:sticky top-24 space-y-4">
            <Card className="overflow-hidden">
                <Image 
                    src={course.image} 
                    alt={course.title}
                    width={1280} 
                    height={720}
                    className="w-full object-cover"
                    data-ai-hint={course.dataAiHint}
                />
                <CardContent className="p-6 space-y-4">
                    <p className="text-4xl font-bold font-headline flex items-center"><IndianRupee className="h-9 w-9" />{course.price}</p>
                    <Button size="lg" className="w-full" onClick={() => handleAddToCart(course as Course)}>
                        Add to Cart
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                        Buy Now
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">30-Day Money-Back Guarantee</p>
                    
                    <div className="space-y-2 pt-4">
                        <h3 className="font-bold">This course includes:</h3>
                        <ul className="text-sm text-muted-foreground space-y-2">
                             <li className="flex items-center gap-2">
                                <Video className="h-4 w-4 text-primary" />
                                <span>{course.duration} on-demand video</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" />
                                <span>Articles & resources</span>
                            </li>
                             <li className="flex items-center gap-2">
                                <InfinityIcon className="h-4 w-4 text-primary" />
                                <span>Full lifetime access</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>

      </div>
    </div>
  );
}
