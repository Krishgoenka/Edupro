"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BrainCircuit, ListChecks, FileScan } from "lucide-react";
import { courses } from "@/lib/courses-data";

const features = [
  {
    icon: <FileScan className="h-10 w-10 text-primary" />,
    title: "Instant Resume Analysis",
    description: "Upload your resume and a job description to see your match score and get AI-powered improvement tips in seconds.",
    href: "/resume",
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: "AI-Powered Skill Matching",
    description: "Our AI identifies critical skill gaps based on your career goals and suggests the precise courses to fill them.",
    href: "/resume",
  },
  {
    icon: <ListChecks className="h-10 w-10 text-primary" />,
    title: "Personalized Learning Paths",
    description: "Receive a custom-curated course bundle designed to bridge your skill gaps and accelerate your career growth.",
    href: "/courses",
  },
];

const featuredCourseIds = ["web-development-bootcamp", "data-science-python", "public-speaking-mastery", "cyber-security-essentials"];
const featuredCourses = courses.filter(course => featuredCourseIds.includes(course.id));

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
            <div className="space-x-4 mt-4">
                <Button asChild size="lg">
                    <Link href="/courses">Explore Courses</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/resume">Analyze Your Resume</Link>
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
                  <Link key={course.id} href={`/courses/${course.id}`} className="block group">
                    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                        <CardHeader className="p-0">
                            <Image
                                src={course.image}
                                alt={course.title}
                                width={600}
                                height={400}
                                className="object-cover w-full h-48"
                                data-ai-hint={course.dataAiHint}
                            />
                        </CardHeader>
                        <CardContent className="p-4 flex-grow">
                             <div className="flex justify-between items-center mb-2">
                                <p className="text-xs font-semibold uppercase text-primary tracking-wider">{course.domain}</p>
                                <p className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{course.category}</p>
                            </div>
                            <CardTitle className="text-lg font-bold font-headline mb-2 leading-tight group-hover:text-primary transition-colors">{course.title}</CardTitle>
                             <CardDescription className="text-sm">{course.description}</CardDescription>
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
          <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href} className="grid gap-4 text-center group p-6 rounded-lg transition-all hover:bg-secondary/50">
                  <div className="flex justify-center items-center transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>
                  <h3 className="text-xl font-bold font-headline transition-colors group-hover:text-primary">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="w-full py-20 md:py-32  bg-secondary/50">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">About EduPro</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
              At EduPro, we're not just building a platform; we're building futures. Our mission is to bridge the gap between ambition and achievement by making high-quality, AI-driven education accessible to all. We believe that the right skills can unlock unimaginable potential. That's why we've created a space where learners can find clear direction, personalized learning paths, and the support they need to conquer the challenges of tomorrow's job market. Join us and transform your potential into your profession.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
