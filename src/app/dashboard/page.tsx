"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses, domains, categoriesByDomain, Domain } from '@/lib/courses-data';
import { useAuth } from '@/context/auth-context';
import { Activity } from 'lucide-react';

// TODO: Replace this with actual user data from Firestore
const userHasCourses = true; // Set to false to see the empty state
const myCourseIds = ['web-development-bootcamp', 'public-speaking-mastery', 'ai-a-z', 'cyber-security-essentials', 'data-science-python', 'digital-marketing-masterclass', 'graphic-design-fundamentals', 'project-management-pmp'];

const myCourses = courses.filter(c => myCourseIds.includes(c.id)).map((course, index) => {
    const progressValues = [45, 0, 100, 20, 0, 75, 10, 90];
    const statusValues = ["In Progress", "Not Started", "Completed", "In Progress", "Not Started", "In Progress", "In Progress", "In Progress"];
    return {
        ...course,
        progress: progressValues[index % progressValues.length],
        status: statusValues[index % statusValues.length],
    };
});

export default function DashboardPage() {
    const { user } = useAuth();
    // TODO: Fetch user's enrolled courses from Firestore
    const [selectedDomain, setSelectedDomain] = useState<Domain | "">("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleDomainChange = (value: Domain | "All") => {
        const newDomain = value === "All" ? "" : value;
        setSelectedDomain(newDomain);
        setSelectedCategory(""); // Reset category when domain changes
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value === "all" ? "" : value);
    };

    const availableCategories = useMemo(() => {
        return selectedDomain ? categoriesByDomain[selectedDomain] : [];
    }, [selectedDomain]);

    const filteredCourses = useMemo(() => {
        // Filter the user's courses, not all courses
        return myCourses.filter(course => {
            const domainMatch = selectedDomain ? course.domain === selectedDomain : true;
            const categoryMatch = selectedCategory ? course.category === selectedCategory : true;
            const searchMatch = searchTerm ? course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            return domainMatch && categoryMatch && searchMatch;
        });
    }, [selectedDomain, selectedCategory, searchTerm]);

    const totalProgress = useMemo(() => {
        if (myCourses.length === 0) return 0;
        const sum = myCourses.reduce((acc, course) => acc + course.progress, 0);
        return Math.round(sum / myCourses.length);
    }, []);
    
    return (
        <div className="container py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Welcome {user?.displayName || 'Back'}!</h1>
                <p className="text-muted-foreground md:text-xl mt-2">Let's continue your learning journey.</p>
            </div>

            <section>
                 {userHasCourses && (
                    <Card className="mb-12">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-2xl font-headline">
                                <Activity className="h-6 w-6 text-primary" />
                                Overall Progress
                            </CardTitle>
                            <CardDescription>
                                Your average progress across all enrolled courses. Keep up the great work!
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-4">
                                <Progress value={totalProgress} className="h-3 flex-grow" />
                                <span className="text-xl font-bold text-primary">{totalProgress}%</span>
                            </div>
                        </CardContent>
                    </Card>
                )}
                
                <h2 className="text-3xl font-bold font-headline mb-6">My Courses</h2>
                {userHasCourses ? (
                    <>
                        <Card className="mb-8 p-4 shadow-lg">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-end">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Filter by Domain</label>
                                    <Select onValueChange={(value) => handleDomainChange(value as Domain | "All")} value={selectedDomain}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a domain" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All Domains</SelectItem>
                                            {domains.map(domain => (
                                                <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Filter by Category</label>
                                    <Select onValueChange={handleCategoryChange} value={selectedCategory} disabled={!selectedDomain}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Categories</SelectItem>
                                            {availableCategories.map(category => (
                                                <SelectItem key={category} value={category}>{category}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                     <label className="text-sm font-medium">Search Your Courses</label>
                                    <Input 
                                        placeholder="e.g. 'React', 'Speaking'..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </Card>
                    
                        {filteredCourses.length > 0 ? (
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {filteredCourses.map(course => (
                                    <Card key={course.id} className="overflow-hidden h-full flex flex-col">
                                        <CardHeader className="p-0">
                                            <Link href={`/dashboard/course/${course.id}`}>
                                                <Image
                                                    src={course.image}
                                                    alt={course.title}
                                                    width={600}
                                                    height={400}
                                                    className="object-cover w-full h-48"
                                                    data-ai-hint={course.dataAiHint}
                                                />
                                            </Link>
                                        </CardHeader>
                                        <CardContent className="p-4 flex-grow">
                                            <div className="flex justify-between items-center mb-2">
                                                <p className="text-xs font-semibold uppercase text-primary tracking-wider">{course.domain}</p>
                                                <p className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">{course.category}</p>
                                            </div>
                                            <CardTitle className="text-lg font-bold font-headline mb-2 leading-tight">{course.title}</CardTitle>
                                            <div className="space-y-2">
                                                <p className="text-sm text-muted-foreground">Status: <span className="font-medium text-foreground">{course.status}</span></p>
                                                <Progress value={course.progress} className="h-2" />
                                                <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0">
                                            <Button asChild className="w-full">
                                                <Link href={`/dashboard/course/${course.id}`}>
                                                    {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                             <div className="text-center col-span-full py-16">
                                <p className="text-lg text-muted-foreground">No courses match your filters.</p>
                                <p className="text-sm text-muted-foreground">Try adjusting your selections.</p>
                            </div>
                        )}
                    </>
                ) : (
                    <Card className="flex items-center justify-center py-20">
                        <CardContent className="text-center">
                            <p className="text-muted-foreground text-lg">You haven’t enrolled in any course yet.</p>
                            <Button asChild className="mt-4">
                                <Link href="/courses">Explore Courses</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </section>
        </div>
    );
}
