"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, BrainCircuit, UploadCloud, BarChartBig, User } from "lucide-react";

const features = [
  {
    icon: <UploadCloud className="h-10 w-10 text-primary" />,
    title: "Instant Resume Analysis",
    description: "Simply paste your resume and let our AI parse your skills and experience in seconds.",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "AI-Powered Skill Matching",
    description: "We match your profile against trending job roles to identify your strengths and skill gaps.",
  },
  {
    icon: <BarChartBig className="h-10 w-10 text-primary" />,
    title: "Personalized Learning Paths",
    description: "Receive a custom-curated course bundle to bridge your skill gaps and boost your career.",
  },
];

const testimonials = [
    {
        quote: "EduPro gave me the exact roadmap I needed. I landed my dream job as a Product Manager just two months after completing the suggested courses!",
        name: "Sarah J.",
        role: "Product Manager",
    },
    {
        quote: "The skill gap analysis was a real eye-opener. I didn't realize how much I was missing for a senior role. This tool is invaluable.",
        name: "Michael B.",
        role: "Senior Software Engineer",
    },
    {
        quote: "As someone switching careers, EduPro was a lifesaver. It demystified the process and gave me a clear, actionable plan.",
        name: "Emily C.",
        role: "UX/UI Designer",
    }
];

const featuredCourses = [
  { id: 1, title: 'Advanced React for Senior Engineers', category: 'Web Development', image: 'https://placehold.co/600x400.png', rating: 4.8, reviews: 1250, price: 4999, dataAiHint: "react code" },
  { id: 2, title: 'Data Science with Python: Zero to Hero', category: 'Data Science', image: 'https://placehold.co/600x400.png', rating: 4.9, reviews: 3421, price: 7999, dataAiHint: "python data" },
  { id: 3, title: 'Product Management Essentials', category: 'Business', image: 'https://placehold.co/600x400.png', rating: 4.7, reviews: 890, price: 6499, dataAiHint: "product roadmap" },
  { id: 4, title: 'UI/UX Design Masterclass', category: 'Design', image: 'https://placehold.co/600x400.png', rating: 4.8, reviews: 2100, price: 5999, dataAiHint: "ui design" },
];

export function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <section id="hero" className="w-full py-20 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl/none font-headline text-primary">
              Unlock Your Career Potential
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              EduPro provides AI-powered guidance and personalized learning paths to help you achieve your professional goals. Start your journey today.
            </p>
            <div className="space-x-4">
                <Button asChild size="lg">
                    <Link href="/courses">Explore Courses</Link>
                </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="featured-courses" className="w-full py-20 md:py-32 bg-secondary/50">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Featured Courses</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    Hand-picked courses to help you get ahead in the most in-demand fields.
                </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {featuredCourses.map(course => (
                    <Link key={course.id} href={`/courses/${course.id}`} className="block">
                        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <CardHeader className="p-0">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    width={600}
                                    height={400}
                                    className="object-cover"
                                    data-ai-hint={course.dataAiHint}
                                />
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <p className="text-sm font-medium text-primary mb-1">{course.category}</p>
                                <CardTitle className="text-lg font-bold font-headline mb-2 leading-tight">{course.title}</CardTitle>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <span className="font-bold text-amber-500">{course.rating}</span>
                                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                    <span>({course.reviews.toLocaleString()} reviews)</span>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <p className="text-xl font-bold font-headline">₹{course.price.toLocaleString()}</p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      <section id="features" className="w-full py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">How EduPro Works for You</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We've simplified the path to your career goals. Here's our simple, three-step process to get you job-ready.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="grid gap-4 text-center">
                  <div className="flex justify-center items-center">{feature.icon}</div>
                  <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-20 md:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Testimonials</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Trusted by Ambitious Professionals</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                      See what our users are saying about their journey with EduPro.
                  </p>
              </div>
              <Carousel
                  opts={{
                      align: "start",
                  }}
                  className="w-full max-w-4xl mx-auto"
              >
                  <CarouselContent>
                      {testimonials.map((testimonial, index) => (
                          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                              <div className="p-1 h-full">
                                  <Card className="flex flex-col justify-between h-full shadow-lg">
                                      <CardContent className="p-6 flex-grow">
                                          <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                                      </CardContent>
                                      <CardHeader className="pt-0">
                                          <div className="flex items-center gap-3">
                                              <div className="p-2 bg-primary rounded-full">
                                                <User className="h-6 w-6 text-primary-foreground"/>
                                              </div>
                                              <div>
                                                  <CardTitle className="text-base font-bold font-headline">{testimonial.name}</CardTitle>
                                                  <CardDescription>{testimonial.role}</CardDescription>
                                              </div>
                                          </div>
                                      </CardHeader>
                                  </Card>
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
              </Carousel>
          </div>
      </section>

      <section id="about" className="w-full py-20 md:py-32">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">About EduPro</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              EduPro was founded on the belief that everyone deserves access to a fulfilling career. In a fast-changing job market, it's hard to know which skills to learn. We leverage the power of AI to provide clear, personalized, and actionable guidance, helping you invest in your education wisely and achieve your professional dreams.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
