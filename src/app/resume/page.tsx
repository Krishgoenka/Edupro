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
import { useToast } from "@/hooks/use-toast";
import { getCourseBundleAction } from "@/app/actions";
import type { GenerateAICourseBundleOutput } from "@/ai/flows/generate-course-bundle";
import { Loader2, ChevronRight } from "lucide-react";

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

export default function ResumePage() {
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
      <section id="resume-advisor" className="w-full py-20 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
                  AI-Powered Resume Advisor
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Paste your resume and choose your dream job to get an instant analysis of your skills, identify gaps, and receive a personalized learning path to accelerate your career.
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
    </div>
  );
}
