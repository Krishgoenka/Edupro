"use client";

import React, { useState, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";
import { getCourseBundleAction } from "./actions";
import type { GenerateAICourseBundleOutput } from "@/ai/flows/generate-course-bundle";
import { Loader2, BrainCircuit, UploadCloud, BarChartBig, CheckCircle, ChevronRight, User } from "lucide-react";

const formSchema = z.object({
  resumeText: z.string({ required_error: "Resume text is required." }).min(200, "Resume text must be at least 200 characters long to provide an accurate analysis."),
  jobRole: z.string({ required_error: "Please select a job role." }),
});

type FormValues = z.infer<typeof formSchema>;

const jobRoles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX/UI Designer",
  "Marketing Manager",
  "Financial Analyst",
];

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

export function HomePage() {
  const [result, setResult] = useState<GenerateAICourseBundleOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resumeText: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      setResult(null);
      const { data: resultData, error } = await getCourseBundleAction(data);
      if (error) {
        toast({
          variant: "destructive",
          title: "An error occurred",
          description: error,
        });
      } else if (resultData) {
        setResult(resultData);
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    });
  };
  
  return (
    <div className="flex flex-col items-center">
      <section id="hero" className="w-full py-20 md:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                  Unlock Your Career Potential with AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Paste your resume, choose your dream job, and let our AI create a personalized learning path to bridge your skill gaps and accelerate your career.
                </p>
              </div>
            </div>
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>Get Your Personalized Plan</CardTitle>
                <CardDescription>Fill out the form below to get started.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="resumeText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Resume Text</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Paste the full text of your resume here..."
                              className="min-h-[200px] resize-y"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="jobRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Job Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a job role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {jobRoles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isPending}>
                      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Generate My Learning Path
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {isPending && (
         <div className="w-full text-center py-16">
            <div className="flex justify-center items-center space-x-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-xl font-headline">Analyzing your resume and building your path...</p>
            </div>
         </div>
      )}

      {result && (
        <section ref={resultsRef} id="results" className="w-full py-20 md:py-32 bg-secondary/50">
            <div className="container px-4 md:px-6">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Your Custom Learning Roadmap</h2>
                    <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                        Based on your resume and target role of <span className="font-bold text-primary">{form.getValues().jobRole}</span>, here's what we recommend.
                    </p>
                </div>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <h3 className="text-2xl font-bold mb-6 font-headline">Key Areas for Development</h3>
                        <Card>
                            <CardContent className="p-6">
                                <ul className="space-y-4">
                                    {result.skillGaps.map((skill, index) => (
                                        <li key={index} className="flex items-center">
                                            <ChevronRight className="h-5 w-5 mr-3 text-primary" />
                                            <span className="text-lg">{skill}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-6 font-headline">Suggested Courses</h3>
                         <div className="grid gap-6">
                            {result.suggestedCourses.map((course) => (
                                <Link key={course.title} href={course.url} target="_blank" rel="noopener noreferrer" className="block transition-transform duration-300 hover:scale-[1.02]">
                                    <Card className="flex items-center space-x-4 overflow-hidden h-full">
                                        <div className="flex-shrink-0">
                                            <Image
                                                src={course.thumbnail || "https://placehold.co/150x150.png"}
                                                alt={course.title}
                                                width={120}
                                                height={120}
                                                className="object-cover h-full"
                                                data-ai-hint="course thumbnail"
                                            />
                                        </div>
                                        <div className="flex-1 p-4">
                                            <CardTitle className="text-base font-bold font-headline mb-1">{course.title}</CardTitle>
                                            <CardDescription className="text-sm">{course.description}</CardDescription>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
      )}

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

      <section id="contact" className="w-full py-20 md:py-32 bg-secondary/50">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">Get in Touch</h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Have questions or feedback? We'd love to hear from you. Reach out to us at <a href="mailto:contact@edupro.com" className="text-primary underline">contact@edupro.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
