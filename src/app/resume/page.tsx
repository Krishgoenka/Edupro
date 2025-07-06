"use client";

import React, { useState, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { analyzeResumeAction } from "@/app/actions";
import type { AnalyzeResumeOutput } from "@/ai/flows/generate-course-bundle";
import { Loader2, ListChecks, FileText, CheckCircle } from "lucide-react";

const formSchema = z.object({
  jobDescription: z.string({ required_error: "Job description is required." }).min(100, "Job description must be at least 100 characters."),
  resume: z
    .instanceof(File, { message: "A resume file is required." })
    .refine((file) => file.size > 0, "Resume file cannot be empty.")
    .refine((file) => file.type === "application/pdf", "Only PDF files are accepted.")
    .refine((file) => file.size < 5 * 1024 * 1024, "File size must be less than 5MB."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ResumePage() {
  const [result, setResult] = useState<AnalyzeResumeOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      setResult(null);

      const formData = new FormData();
      formData.append('jobDescription', data.jobDescription);
      formData.append('resume', data.resume);

      // TODO: Add check for Firebase Auth. If not logged in, redirect to '/login'.
      const { data: resultData, error } = await analyzeResumeAction(formData);

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
                  Upload your resume and paste a job description to get instant, AI-driven feedback. We'll identify missing skills and provide actionable advice to make your resume stand out.
                </p>
                 <p className="text-sm text-amber-600 dark:text-amber-400">Note: Login is required to save and track your results.</p>
              </div>
            </div>
            <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>Get Your Personalized Analysis</CardTitle>
                <CardDescription>Upload your PDF resume and the job description below.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="jobDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Paste the full job description here..."
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
                        name="resume"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>Upload Resume (PDF only, max 5MB)</FormLabel>
                            <FormControl>
                              <Input
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => {
                                  if (e.target.files) {
                                    onChange(e.target.files[0]);
                                  }
                                }}
                                {...rest}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <Button type="submit" className="w-full" disabled={isPending}>
                      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Enhance Resume
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
              <p className="text-xl font-headline">Analyzing your resume, please wait...</p>
            </div>
         </div>
      )}

      {result && (
        <section ref={resultsRef} id="results" className="w-full py-20 md:py-32 bg-secondary/50">
            <div className="container px-4 md:px-6">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Your Resume Analysis</h2>
                    <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                        Here's how your resume stacks up and how you can improve it.
                    </p>
                </div>
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <div>
                        <h3 className="text-2xl font-bold mb-6 font-headline flex items-center gap-3"><FileText className="h-7 w-7 text-primary"/> Skill Gap Analysis</h3>
                        <Card>
                          <CardContent className="p-0">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-1/2">Missing Skills</TableHead>
                                  <TableHead className="w-1/2">Skills to Add</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {result.analysisTable.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell>{item.missingSkill}</TableCell>
                                    <TableCell>{item.skillToAdd}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold mb-6 font-headline flex items-center gap-3"><ListChecks className="h-7 w-7 text-primary"/> Improvement Suggestions</h3>
                         <Card>
                            <CardContent className="p-6">
                              <ul className="space-y-4">
                                {result.recommendations.map((rec, index) => (
                                  <li key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 mt-1 text-green-600 flex-shrink-0" />
                                    <span>{rec}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
      )}
    </div>
  );
}
