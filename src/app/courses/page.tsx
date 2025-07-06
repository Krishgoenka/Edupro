"use client";

import React, { useState, useMemo } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses as allCourses, domains, categoriesByDomain, Domain } from '@/lib/courses-data';
import { AiRecommender } from '@/components/ai-recommender';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';

export default function CoursesPage() {
    const [selectedDomain, setSelectedDomain] = useState<Domain | "">("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();
    const { user } = useAuth();
    const { toast } = useToast();

    const handleBuyCourse = () => {
        if (!user) {
          toast({
            variant: "destructive",
            title: "Authentication Required",
            description: "Please log in to purchase a course.",
          });
          router.push("/login");
        } else {
          // TODO: Add to firestore
          toast({
            title: "Success!",
            description: "Course added to your dashboard.",
          });
          router.push("/dashboard");
        }
      };

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
        return allCourses.filter(course => {
            const domainMatch = selectedDomain ? course.domain === selectedDomain : true;
            const categoryMatch = selectedCategory ? course.category === selectedCategory : true;
            const searchMatch = searchTerm ? course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase()) : true;
            return domainMatch && categoryMatch && searchMatch;
        });
    }, [selectedDomain, selectedCategory, searchTerm]);

    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Explore All Courses</h1>
                <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-2">
                    Find the perfect course to advance your skills and career.
                </p>
            </div>

            <Card className="mb-8 p-4 shadow-lg">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Choose Your Domain</label>
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
                        <label className="text-sm font-medium">Choose Your Course Category</label>
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
                    <div className="space-y-2 lg:col-span-1">
                         <label className="text-sm font-medium">Search Courses</label>
                        <Input 
                            placeholder="e.g. 'React', 'Spoken English'..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="lg:col-span-1">
                        <AiRecommender />
                    </div>
                </div>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredCourses.map(course => (
                    <Card key={course.id} className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <CardHeader className="p-0">
                            <Link href={`/courses/${course.id}`} className="block">
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
                            <CardTitle className="text-lg font-bold font-headline mb-2 leading-tight">
                                <Link href={`/courses/${course.id}`} className="hover:text-primary">{course.title}</Link>
                            </CardTitle>
                            <CardDescription className="text-sm">{course.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                            <p className="text-xl font-bold font-headline">₹{course.price}</p>
                            <Button onClick={handleBuyCourse}>
                                Buy Course
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
             {filteredCourses.length === 0 && (
                <div className="text-center col-span-full py-16">
                    <p className="text-lg text-muted-foreground">No courses match your criteria.</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your filters or use our AI Recommender!</p>
                </div>
            )}
        </div>
    );
}
