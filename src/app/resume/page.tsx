
"use client";

import React, { useState, useRef, useTransition, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useReactToPrint } from 'react-to-print';

import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { analyzeResumeAction, generateResumeAction } from "@/app/actions";
import type { AnalyzeResumeOutput } from "@/ai/flows/generate-course-bundle";
import { GeneratedResumeSchema, type GeneratedResume } from "@/ai/schemas/resume";
import { Loader2, ListChecks, FileText, CheckCircle, Target, PenSquare, Copy, Wand2, Download, Trash2, PlusCircle, User, Briefcase, GraduationCap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Resume Analyzer Component ---

const analyzerFormSchema = z.object({
  jobDescription: z.string({ required_error: "Job description is required." }).min(100, "Job description must be at least 100 characters."),
  resume: z
    .instanceof(File, { message: "A resume file is required." })
    .refine((file) => file.size > 0, "Resume file cannot be empty.")
    .refine(
        (file) => file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type.startsWith("image/"),
        "Only PDF, DOCX, and image files are accepted."
    )
    .refine((file) => file.size < 5 * 1024 * 1024, "File size must be less than 5MB."),
});

type AnalyzerFormValues = z.infer<typeof analyzerFormSchema>;

function ResumeAnalyzer() {
  const [result, setResult] = useState<AnalyzeResumeOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<AnalyzerFormValues>({
    resolver: zodResolver(analyzerFormSchema),
    defaultValues: { jobDescription: "" },
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  const onSubmit = (data: AnalyzerFormValues) => {
    startTransition(async () => {
      setResult(null);
      const formData = new FormData();
      formData.append('jobDescription', data.jobDescription);
      formData.append('resume', data.resume);
      const { data: resultData, error } = await analyzeResumeAction(formData);
      if (error) {
        toast({ variant: "destructive", title: "An error occurred", description: error });
      } else if (resultData) {
        setResult(resultData);
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Get Your Personalized Analysis</CardTitle>
        <CardDescription>Upload your resume and the job description below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="jobDescription" render={({ field }) => (
              <FormItem>
                <FormLabel>Job Description</FormLabel>
                <FormControl><Textarea placeholder="Paste the full job description here..." className="min-h-[200px] resize-y" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Resume (PDF, DOCX, Image - max 5MB)</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files ? e.target.files[0] : null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" size="lg" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Analyze
            </Button>
          </form>
        </Form>
        {isPending && (
          <div className="w-full text-center py-16"><div className="flex justify-center items-center space-x-4"><Loader2 className="h-12 w-12 animate-spin text-primary" /><p className="text-xl font-headline">Analyzing your resume...</p></div></div>
        )}
        {result && (
          <div ref={resultsRef} className="mt-12">
            <div className="text-center space-y-4 mb-12"><h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Your Personalized Feedback</h2><p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">Here's how your resume stacks up.</p></div>
            <div className="grid gap-8">
              <Card><CardHeader><CardTitle className="flex items-center gap-3 text-2xl font-headline text-center justify-center"><Target className="h-7 w-7 text-primary"/>Overall Match Score</CardTitle></CardHeader><CardContent className="space-y-4 text-center"><p className="text-7xl font-bold font-headline text-primary">{result.matchPercentage}%</p><p className="text-muted-foreground max-w-md mx-auto">This score reflects how well your resume aligns with the job description.</p></CardContent></Card>
              <Card><CardHeader><CardTitle className="flex items-center justify-between text-2xl font-headline"><div className="flex items-center gap-3"><PenSquare className="h-7 w-7 text-primary"/>Suggested Summary</div><Button variant="ghost" size="icon" onClick={() => handleCopy(result.revisedSummary)}><Copy className="h-5 w-5"/><span className="sr-only">Copy</span></Button></CardTitle><CardDescription>Here’s an improved summary tailored for this role.</CardDescription></CardHeader><CardContent><blockquote className="border-l-4 border-primary pl-4 py-2 bg-background italic text-muted-foreground">{result.revisedSummary}</blockquote></CardContent></Card>
              <div className="grid gap-8 lg:grid-cols-2">
                <div><h3 className="text-2xl font-bold mb-4 font-headline flex items-center gap-3"><FileText className="h-7 w-7 text-primary"/> Skill Gap Analysis</h3><Card><Table><TableHeader><TableRow><TableHead className="w-1/2">Missing Skill</TableHead><TableHead className="w-1/2">Suggested Improvement</TableHead></TableRow></TableHeader><TableBody>{result.analysisTable.map((item, index) => (<TableRow key={index}><TableCell className="font-medium">{item.missingSkill}</TableCell><TableCell>{item.suggestedImprovement}</TableCell></TableRow>))}</TableBody></Table></Card></div>
                <div><h3 className="text-2xl font-bold mb-4 font-headline flex items-center gap-3"><ListChecks className="h-7 w-7 text-primary"/> Recommendations</h3><Card><CardContent className="p-6"><ul className="space-y-4">{result.recommendations.map((rec, index) => (<li key={index} className="flex items-start gap-3"><CheckCircle className="h-5 w-5 mt-1 text-green-600 flex-shrink-0" /><span>{rec}</span></li>))}</ul></CardContent></Card></div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// --- Resume Creator Components ---

const creatorFormSchema = z.object({
  userInput: z.string().optional(),
  resumeFile: z.instanceof(File).optional()
    .refine((file) => !file || file.size < 5 * 1024 * 1024, "File size must be less than 5MB.")
    .refine(
        (file) => !file || file.type === "application/pdf" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file.type.startsWith("image/"),
        "Only PDF, DOCX, and image files are accepted."
    ),
}).refine(data => data.userInput || data.resumeFile, {
    message: "Please provide some input, either by typing or uploading a file.",
    path: ["userInput"],
});
type CreatorFormValues = z.infer<typeof creatorFormSchema>;


const PrintableResume = React.forwardRef<HTMLDivElement, { data: GeneratedResume }>(({ data }, ref) => {
  return (
    <div ref={ref} className="font-[Georgia,serif] text-black bg-white p-12">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center">{data.personalDetails.name}</h1>
        <div className="flex justify-center gap-x-4 gap-y-1 text-sm text-gray-600 my-2 flex-wrap text-center">
            {data.personalDetails.email && <p>{data.personalDetails.email}</p>}
            {data.personalDetails.phone && <p>{data.personalDetails.phone}</p>}
            {data.personalDetails.location && <p>{data.personalDetails.location}</p>}
            {data.personalDetails.linkedin && <p>{data.personalDetails.linkedin}</p>}
            {data.personalDetails.github && <p>{data.personalDetails.github}</p>}
        </div>
        
        <h3 className="text-lg font-bold border-b-2 border-gray-300 mt-6 mb-2">SUMMARY</h3>
        <p className="w-full text-sm">{data.summary}</p>

        <h3 className="text-lg font-bold border-b-2 border-gray-300 mt-6 mb-2">EXPERIENCE</h3>
        {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
                <div className="flex justify-between font-bold">
                    <p className="text-md">{exp.role}</p>
                    <p className="text-md text-right">{exp.dates}</p>
                </div>
                <p className="italic">{exp.company}</p>
                <ul className="list-disc list-inside mt-1 ml-4 space-y-1 text-sm">
                    {exp.description.map((desc, descIndex) => (
                        <li key={descIndex}>{desc}</li>
                    ))}
                </ul>
            </div>
        ))}

        <h3 className="text-lg font-bold border-b-2 border-gray-300 mt-6 mb-2">EDUCATION</h3>
        {data.education.map((edu, index) => (
            <div key={index} className="mb-2">
                <div className="flex justify-between font-bold">
                   <p className="text-md">{edu.degree}</p>
                   <p className="text-md text-right">{edu.dates}</p>
                </div>
                 <p className="italic">{edu.institution}</p>
            </div>
        ))}

        <h3 className="text-lg font-bold border-b-2 border-gray-300 mt-6 mb-2">SKILLS</h3>
        <p className="w-full text-sm">{Array.isArray(data.skills) ? data.skills.join(', ') : ''}</p>
      </div>
    </div>
  );
});
PrintableResume.displayName = 'PrintableResume';


const ResumePreview = ({ initialData }: { initialData: GeneratedResume }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const sanitizedData = React.useMemo(() => {
    const data = initialData || {};
    return {
      personalDetails: {
        name: data.personalDetails?.name ?? '',
        email: data.personalDetails?.email ?? '',
        phone: data.personalDetails?.phone ?? '',
        linkedin: data.personalDetails?.linkedin ?? '',
        github: data.personalDetails?.github ?? '',
        location: data.personalDetails?.location ?? '',
      },
      summary: data.summary ?? '',
      experience: (Array.isArray(data.experience) ? data.experience : []).map(exp => ({
        role: exp?.role ?? '',
        company: exp?.company ?? '',
        dates: exp?.dates ?? '',
        description: (Array.isArray(exp?.description) ? exp.description : []).map(d => d ?? ''),
      })).filter(Boolean),
      education: (Array.isArray(data.education) ? data.education : []).map(edu => ({
        degree: edu?.degree ?? '',
        institution: edu?.institution ?? '',
        dates: edu?.dates ?? '',
      })).filter(Boolean),
      skills: Array.isArray(data.skills) ? data.skills.map(s => s ?? '') : [],
    };
  }, [initialData]);

  const form = useForm<GeneratedResume>({
    resolver: zodResolver(GeneratedResumeSchema),
    defaultValues: sanitizedData,
  });

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${form.getValues('personalDetails.name') || 'resume'}-EduPro`,
    onAfterPrint: () => toast({ title: "Resume Downloaded!" }),
  });

  useEffect(() => {
    form.reset(sanitizedData);
  }, [sanitizedData, form]);

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control: form.control, name: "experience" });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control: form.control, name: "education" });
  
  const watchedData = form.watch();

  return (
     <div className="mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Your Generated Resume</h2>
                <p className="text-muted-foreground md:text-xl">Review, edit, and download your new resume.</p>
            </div>
            <button
                onClick={handlePrint}
                className={cn(buttonVariants({ size: 'lg' }))}
            >
                <Download className="mr-2 h-5 w-5"/>Download as PDF
            </button>
        </div>

        {/* This component is only for printing */}
        <div className="hidden">
            <div className="print:block">
                <PrintableResume ref={resumeRef} data={watchedData} />
            </div>
        </div>
        
        {/* Screen-only, editable version */}
        <div className="block print:hidden">
            <Form {...form}>
                <div className="p-8 bg-white text-black font-[Georgia,serif] shadow-lg rounded-md">
                    <div className="w-full max-w-4xl mx-auto">
                        <Controller control={form.control} name="personalDetails.name" render={({ field }) => ( <Input {...field} className="text-4xl font-bold text-center border-0 p-0 h-auto" /> )}/>
                        <div className="flex justify-center gap-x-4 gap-y-1 text-sm text-gray-600 my-2 flex-wrap">
                            <Controller control={form.control} name="personalDetails.email" render={({ field }) => <Input {...field} className="border-0 p-0 h-auto" />} />
                            <Controller control={form.control} name="personalDetails.phone" render={({ field }) => <Input {...field} className="border-0 p-0 h-auto" />} />
                            <Controller control={form.control} name="personalDetails.location" render={({ field }) => <Input {...field} className="border-0 p-0 h-auto" />} />
                            <Controller control={form.control} name="personalDetails.linkedin" render={({ field }) => <Input {...field} className="border-0 p-0 h-auto" />} />
                            <Controller control={form.control} name="personalDetails.github" render={({ field }) => <Input {...field} className="border-0 p-0 h-auto" />} />
                        </div>
                        
                        <h3 className="text-lg font-bold border-b-2 border-gray-300 mt-6 mb-2">SUMMARY</h3>
                        <Controller control={form.control} name="summary" render={({ field }) => <Textarea {...field} className="w-full text-sm border-0 p-0" />} />

                        <h3 className="text-lg font-bold border-b-2 border-gray-300 mt-6 mb-2">EXPERIENCE</h3>
                        {expFields.map((field, index) => (
                            <div key={field.id} className="mb-4 relative group">
                                <div className="flex justify-between font-bold">
                                    <Controller control={form.control} name={`experience.${index}.role`} render={({ field }) => <Input {...field} className="text-md border-0 p-0 h-auto font-bold" />} />
                                    <Controller control={form.control} name={`experience.${index}.dates`} render={({ field }) => <Input {...field} className="text-md border-0 p-0 h-auto font-bold text-right" />} />
                                </div>
                                <Controller control={form.control} name={`experience.${index}.company`} render={({ field }) => <Input {...field} className="italic border-0 p-0 h-auto" />} />
                                <ul className="list-disc list-inside mt-1 ml-4 space-y-1">
                                    {field.description.map((_, descIndex) => (
                                        <li key={descIndex}><Controller control={form.control} name={`experience.${index}.description.${descIndex}`} render={({ field }) => <Textarea {...field} className="w-full text-sm border-0 p-0 inline-block" />} /></li>
                                    ))}
                                </ul>
                                <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeExp(index)}><Trash2 className="h-4 w-4"/></Button>
                            </div>
                        ))}
                        <Button variant="ghost" onClick={() => appendExp({ role: '', company: '', dates: '', description: [''] })}><PlusCircle className="mr-2"/>Add Experience</Button>

                        <h3 className="text-lg font-bold border-b-2 border-gray-300 mt-6 mb-2">EDUCATION</h3>
                        {eduFields.map((field, index) => (
                            <div key={field.id} className="mb-2 relative group">
                                <div className="flex justify-between font-bold">
                                   <Controller control={form.control} name={`education.${index}.degree`} render={({ field }) => <Input {...field} className="text-md border-0 p-0 h-auto font-bold" />} />
                                   <Controller control={form.control} name={`education.${index}.dates`} render={({ field }) => <Input {...field} className="text-md border-0 p-0 h-auto font-bold text-right" />} />
                                </div>
                                 <Controller control={form.control} name={`education.${index}.institution`} render={({ field }) => <Input {...field} className="italic border-0 p-0 h-auto" />} />
                                 <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100" onClick={() => removeEdu(index)}><Trash2 className="h-4 w-4"/></Button>
                            </div>
                        ))}
                        <Button variant="ghost" onClick={() => appendEdu({ degree: '', institution: '', dates: '' })}><PlusCircle className="mr-2"/>Add Education</Button>

                        <h3 className="text-lg font-bold border-b-2 border-gray-300 mt-6 mb-2">SKILLS</h3>
                        <Controller control={form.control} name="skills" render={({ field }) => <Textarea {...field} onChange={(e) => field.onChange(e.target.value.split(','))} value={Array.isArray(field.value) ? field.value.join(', ') : ''} className="w-full text-sm border-0 p-0" />} />
                    </div>
                </div>
            </Form>
        </div>
    </div>
  );
};


function ResumeCreator() {
  const [result, setResult] = useState<GeneratedResume | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<CreatorFormValues>({
    resolver: zodResolver(creatorFormSchema),
    defaultValues: { userInput: "" },
  });

  const onSubmit = (data: CreatorFormValues) => {
    startTransition(async () => {
      setResult(null);
      const formData = new FormData();
      if(data.userInput) formData.append('userInput', data.userInput);
      if(data.resumeFile) formData.append('resumeFile', data.resumeFile);
      
      const { data: resultData, error } = await generateResumeAction(formData);
      if (error) {
        toast({ variant: "destructive", title: "An error occurred", description: error });
      } else if (resultData) {
        const validatedResult = GeneratedResumeSchema.safeParse(resultData);
        if (validatedResult.success) {
            setResult(validatedResult.data);
        } else {
            toast({
                variant: "destructive",
                title: "AI Generation Error",
                description: "The AI returned data in an unexpected format. Please try generating again.",
            });
            console.error("AI returned data that doesn't match schema:", validatedResult.error);
        }
        setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI-Powered Resume Builder</CardTitle>
        <CardDescription>Describe yourself, your experience, or upload an existing resume (PDF, DOCX, Image) to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        {!result && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="userInput" render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Professional Story / Modification Instructions</FormLabel>
                  <FormControl><Textarea placeholder="Describe your experience, or if uploading a file, tell the AI what changes you'd like to make. For example: 'Make my summary more punchy and add a project about a Next.js e-commerce site.'" className="min-h-[200px] resize-y" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or</span></div>
              <FormField
                control={form.control}
                name="resumeFile"
                render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem>
                    <FormLabel>Upload Existing Resume (PDF, DOCX, Image - max 5MB)</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*"
                        onChange={(e) => {
                          onChange(e.target.files ? e.target.files[0] : null);
                        }}
                        {...rest}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate Resume
              </Button>
            </form>
          </Form>
        )}
        {isPending && (
          <div className="w-full text-center py-16"><div className="flex justify-center items-center space-x-4"><Loader2 className="h-12 w-12 animate-spin text-primary" /><p className="text-xl font-headline">Generating your new resume...</p></div></div>
        )}
        <div ref={resultsRef}>
          {result && <ResumePreview initialData={result} />}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Main Page Component ---

export default function ResumePage() {
  return (
    <div className="flex flex-col items-center">
      <section id="resume-advisor" className="w-full py-20 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline text-primary">
              AI Resume & Career Hub
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
              Whether you need to build a new resume from scratch or analyze an existing one against a job description, our AI tools are here to help you stand out.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="analyze" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="analyze">Analyze Resume</TabsTrigger>
                <TabsTrigger value="create">Create Resume</TabsTrigger>
              </TabsList>
              <TabsContent value="analyze" className="mt-6">
                <ResumeAnalyzer />
              </TabsContent>
              <TabsContent value="create" className="mt-6">
                <ResumeCreator />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}

    