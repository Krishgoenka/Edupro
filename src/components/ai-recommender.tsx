"use client";

import React, { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Wand2, CheckCircle, Package, IndianRupee } from 'lucide-react';
import { getPersonalizedBundleAction } from '@/app/actions';
import type { PersonalizedBundleOutput } from '@/ai/flows/generate-personalized-bundle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Separator } from './ui/separator';
import Link from 'next/link';

export function AiRecommender() {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState<PersonalizedBundleOutput | null>(null);
    const { toast } = useToast();

    const handleSubmit = () => {
        if (userInput.trim().length < 20) {
            toast({
                variant: "destructive",
                title: "Input too short",
                description: "Please provide more details about your background and goals (at least 20 characters).",
            });
            return;
        }

        startTransition(async () => {
            // TODO: Add check for Firebase Auth. If not logged in, redirect to '/login'.
            // For now, we proceed directly to the action.
            const { data, error } = await getPersonalizedBundleAction(userInput);

            if (error) {
                toast({
                    variant: "destructive",
                    title: "AI Recommender Error",
                    description: error,
                });
            } else {
                setResult(data);
            }
        });
    };

    const handleReset = () => {
        setResult(null);
        setUserInput('');
    }

    const totalBundlePrice = result?.recommendedCourses.reduce((total, course) => total + course.price, 0) || 0;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-accent to-primary text-white">
                    <Sparkles className="mr-2 h-4 w-4" />
                    AI-Powered Personalized Courses
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl font-headline">
                        <Wand2 className="h-6 w-6 text-primary" />
                        Personalized Course Recommender
                    </DialogTitle>
                    <DialogDescription>
                        Tell us your background and goals. Our AI will craft a unique course bundle just for you.
                    </DialogDescription>
                </DialogHeader>

                {!result ? (
                    <div className="grid gap-4 py-4">
                        <Textarea
                            placeholder="e.g., I'm a 1st year CS student. I want to become a frontend developer, but I struggle with English and confidence."
                            className="min-h-[120px]"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            disabled={isPending}
                        />
                        <Button onClick={handleSubmit} disabled={isPending || userInput.trim().length < 20}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Generate My Bundle
                        </Button>
                    </div>
                ) : (
                    <div className='py-4 max-h-[60vh] overflow-y-auto pr-2'>
                        <Card className="bg-secondary/50">
                            <CardHeader>
                                <CardTitle className='flex items-center gap-3 font-headline'>
                                    <Package className='h-6 w-6 text-primary' />
                                    Your Personalized Learning Path
                                </CardTitle>
                                <CardDescription>{result.bundleSummary}</CardDescription>
                            </CardHeader>
                            <CardContent className='space-y-4'>
                                {result.recommendedCourses.map(course => (
                                    <Card key={course.id} className='bg-background'>
                                        <CardHeader>
                                            <div className='flex justify-between items-start'>
                                                <CardTitle className='text-lg font-headline'>{course.title}</CardTitle>
                                                <p className='text-lg font-bold text-primary'>₹{course.price}</p>
                                            </div>
                                             <CardDescription className='flex items-start gap-2 pt-2'>
                                                <CheckCircle className="h-4 w-4 mt-1 text-green-500 flex-shrink-0" />
                                                <span><span className='font-semibold'>Reason:</span> {course.reason}</span>
                                            </CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                                <Separator />
                                <div className='text-right'>
                                    <p className='text-muted-foreground'>Total Bundle Price</p>
                                    <p className='text-3xl font-bold font-headline text-primary flex items-center justify-end'>
                                        <IndianRupee className='h-7 w-7'/>{totalBundlePrice}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}


                <DialogFooter>
                    {result ? (
                        <>
                            <Button variant="outline" onClick={handleReset}>Create a New Bundle</Button>
                            {/* TODO: Implement Firestore logic to enroll user in all bundle courses and redirect */}
                            <Button asChild>
                                <Link href="/dashboard">Enroll Now - ₹{totalBundlePrice}</Link>
                            </Button>
                        </>
                    ) : (
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
