
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses as allCourses, domains, Course } from '@/lib/courses-data';
import type { GeneratedResume } from '@/ai/schemas/resume';
import { useAuth } from '@/context/auth-context';
import { db } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Activity, Loader2, FileText } from 'lucide-react';

type EnrolledCourseInfo = {
    course: Course;
    enrolledSegments: Set<string>; 
    progress: number;
    status: string;
}

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseInfo[]>([]);
    const [savedResumes, setSavedResumes] = useState<GeneratedResume[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedDomain, setSelectedDomain] = useState<Domain | "">("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                setLoading(false);
                return;
            };

            setLoading(true);
            
            // Fetch Enrolled Courses
            let userCourseData: { courseId: string; segmentIds: string[]; }[] = [];
            const userCoursesRef = doc(db, 'userCourses', user.uid);
            try {
                const docSnap = await getDoc(userCoursesRef);
                if (docSnap.exists()) {
                   userCourseData = docSnap.data().courses || [];
                }
            } catch (error) {
                console.error("Error fetching user courses from Firestore:", error);
            }

            const coursesToDisplay: EnrolledCourseInfo[] = userCourseData.map(item => {
                const courseData = allCourses.find(c => c.id === item.courseId);
                if (!courseData) return null;

                const segmentIds = new Set(item.segmentIds);
                const isFull = segmentIds.has('full');
                const totalTopics = courseData.curriculum.flatMap(c => c.subTopics).length;
                const allSegmentIds = isFull 
                    ? new Set(courseData.curriculum.flatMap(c => c.subTopics.map(s => s.segmentId)))
                    : segmentIds;
                const ownedSegmentCount = allSegmentIds.size;
                
                const progress = totalTopics > 0 ? Math.round((ownedSegmentCount / totalTopics) * 100) : 0;
                
                let status = "Not Started";
                if (progress >= 100) status = "Completed";
                else if (progress > 0) status = "In Progress";

                return { course: courseData, enrolledSegments: allSegmentIds, progress, status };
            }).filter(Boolean) as EnrolledCourseInfo[];
            setEnrolledCourses(coursesToDisplay);

            // Fetch Saved Resumes
            try {
                const q = query(collection(db, "resumes"), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const resumes: GeneratedResume[] = [];
                querySnapshot.forEach((doc) => {
                    resumes.push(doc.data() as GeneratedResume);
                });
                setSavedResumes(resumes);
            } catch (error) {
                 console.error("Error fetching user resumes from Firestore:", error);
            }
            
            setLoading(false);
        };

        if(user) {
            fetchData();
        }
    }, [user]);

    const handleDomainChange = (value: Domain | "All") => {
        const newDomain = value === "All" ? "" : value;
        setSelectedDomain(newDomain);
        setSelectedCategory(""); 
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value === "all" ? "" : value);
    };

    const availableCategories = useMemo(() => {
        const categories = new Set<string>();
        if (selectedDomain) {
            enrolledCourses.forEach(info => {
                if (info.course.domain === selectedDomain) {
                    categories.add(info.course.category);
                }
            });
        }
        return Array.from(categories);
    }, [selectedDomain, enrolledCourses]);

    const filteredCourses = useMemo(() => {
        return enrolledCourses.filter(info => {
            const domainMatch = selectedDomain ? info.course.domain === selectedDomain : true;
            const categoryMatch = selectedCategory ? info.course.category === selectedCategory : true;
            const searchMatch = searchTerm ? info.course.title.toLowerCase().includes(searchTerm.toLowerCase()) || info.course.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            return domainMatch && categoryMatch && searchMatch;
        });
    }, [enrolledCourses, selectedDomain, selectedCategory, searchTerm]);

    const totalProgress = useMemo(() => {
        if (enrolledCourses.length === 0) return 0;
        const sum = enrolledCourses.reduce((acc, info) => acc + info.progress, 0);
        return Math.round(sum / enrolledCourses.length);
    }, [enrolledCourses]);
    
    if (loading || authLoading) {
        return (
           <div className="flex justify-center items-center h-[calc(100vh-200px)]">
               <Loader2 className="h-12 w-12 animate-spin text-primary" />
           </div>
       );
   }

    return (
        <div className="container py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Welcome {user?.displayName || 'Back'}!</h1>
                <p className="text-muted-foreground md:text-xl mt-2">Let's continue your learning journey.</p>
            </div>

            <section className="mb-12">
                 {enrolledCourses.length > 0 && (
                    <Card>
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
            </section>
                
            <section className="mb-12">
                <h2 className="text-3xl font-bold font-headline mb-6">My Courses</h2>
                {enrolledCourses.length > 0 ? (
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
                                {filteredCourses.map(({ course, progress, status }) => (
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
                                                <p className="text-sm text-muted-foreground">Status: <span className="font-medium text-foreground">{status}</span></p>
                                                <Progress value={progress} className="h-2" />
                                                <p className="text-xs text-muted-foreground">{progress}% complete</p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0">
                                            <Button asChild className="w-full">
                                                <Link href={`/dashboard/course/${course.id}`}>
                                                    {progress === 100 ? 'Review Course' : progress > 0 ? 'Continue Learning' : 'Start Course'}
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
            <section>
                <h2 className="text-3xl font-bold font-headline mb-6">My Saved Resumes</h2>
                 {savedResumes.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {savedResumes.map((resume, index) => (
                            <Card key={index} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <FileText className="h-6 w-6 text-primary" />
                                        <span>{resume.personalDetails.name}'s Resume</span>
                                    </CardTitle>
                                    <CardDescription>
                                        Generated on {new Date(resume.createdAt.seconds * 1000).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-sm text-muted-foreground line-clamp-3">{resume.summary}</p>
                                </CardContent>
                                <CardFooter>
                                    {/* TODO: Link to a page to view/edit the full resume */}
                                    <Button variant="outline" className="w-full" disabled>View/Edit (Coming Soon)</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                 ) : (
                    <Card className="flex items-center justify-center py-20">
                        <CardContent className="text-center">
                            <p className="text-muted-foreground text-lg">You haven’t generated any resumes yet.</p>
                            <Button asChild className="mt-4">
                                <Link href="/resume">Create a Resume</Link>
                            </Button>
                        </CardContent>
                    </Card>
                 )}
            </section>
        </div>
    );
}
