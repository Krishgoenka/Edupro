
"use client";

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2 } from 'lucide-react';

const professionalStatuses = ["Student (High School)", "Student (College/University)", "Working Professional", "Career Changer", "Job Seeker", "Other"];
const careerGoals = ["Get my first job", "Get a promotion", "Switch to a new career field", "Upskill in my current role", "Explore new interests"];

const onboardingSchema = z.object({
  professionalStatus: z.string({
    required_error: "Please select your current professional status.",
  }),
  careerGoals: z.string({
    required_error: "Please select your primary career goal.",
  }),
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

interface OnboardingDialogProps {
  user: User;
  onClose: () => void;
}

export function OnboardingDialog({ user, onClose }: OnboardingDialogProps) {
    const [open, setOpen] = useState(true);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const form = useForm<OnboardingFormValues>({
        resolver: zodResolver(onboardingSchema),
    });

    const onSubmit = (data: OnboardingFormValues) => {
        startTransition(async () => {
            try {
                const userRef = doc(db, 'users', user.uid);
                await updateDoc(userRef, {
                    ...data,
                    onboardingComplete: true
                });
                toast({
                    title: "Welcome!",
                    description: "Your profile has been updated.",
                });
                setOpen(false);
                onClose();
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Could not save your preferences. Please try again.",
                });
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if(!isOpen) { setOpen(false); onClose(); } }}>
            <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-headline">Welcome to EduPro!</DialogTitle>
                    <DialogDescription>
                        Help us personalize your experience. Just a couple of quick questions.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
                        <FormField
                            control={form.control}
                            name="professionalStatus"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="font-semibold">What is your current professional status?</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {professionalStatuses.map(status => (
                                                <FormItem key={status} className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={status} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{status}</FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="careerGoals"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="font-semibold">What are your primary career goals right now?</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="flex flex-col space-y-1"
                                        >
                                            {careerGoals.map(goal => (
                                                <FormItem key={goal} className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem value={goal} />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">{goal}</FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save & Continue
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
