
"use client";

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Loader2, User as UserIcon, LogOut, KeyRound, HelpCircle, Briefcase, Target, Edit, Check, Upload, ShieldCheck } from 'lucide-react';
import { signOut, sendPasswordResetEmail, updateProfile as updateAuthProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { updateUserProfileAction, updateUserAvatarAction } from '@/app/actions';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from '@/components/ui/input';

const professionalStatuses = ["Student (High School)", "Student (College/University)", "Working Professional", "Career Changer", "Job Seeker", "Other"];
const careerGoals = ["Get my first job", "Get a promotion", "Switch to a new career field", "Upskill in my current role", "Explore new interests"];

const profileFormSchema = z.object({
  professionalStatus: z.string().optional(),
  careerGoals: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfilePage() {
    const { user, profile, loading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isPending, startTransition] = useTransition();
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        values: {
            professionalStatus: profile?.professionalStatus,
            careerGoals: profile?.careerGoals,
        }
    });

    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if (profile) {
            form.reset({
                professionalStatus: profile.professionalStatus,
                careerGoals: profile.careerGoals,
            });
        }
    }, [user, loading, profile, router, form]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast({
                title: "Logged Out",
                description: "You have been successfully logged out.",
            });
            router.push('/');
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Logout Failed",
                description: "Something went wrong. Please try again.",
            });
        }
    };
    
    const handleResetPassword = async () => {
        if (!user?.email) {
             toast({ variant: "destructive", title: "Error", description: "No email address found for your account." });
             return;
        }
        try {
            await sendPasswordResetEmail(auth, user.email);
            toast({
                title: "Password Reset Email Sent",
                description: `A link to reset your password has been sent to ${user.email}.`,
            });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to send password reset email. Please try again later." });
        }
    }

    const onProfileSubmit = (data: ProfileFormValues) => {
        startTransition(async () => {
            const idToken = await user?.getIdToken();
            const formData = new FormData();
            formData.append('idToken', idToken || '');
            formData.append('professionalStatus', data.professionalStatus || '');
            formData.append('careerGoals', data.careerGoals || '');

            const { success, error } = await updateUserProfileAction(formData);

            if (success) {
                toast({ title: "Profile Updated!", description: "Your changes have been saved." });
                setIsEditMode(false);
            } else {
                toast({ variant: "destructive", title: "Update Failed", description: error });
            }
        });
    }
    
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            startTransition(async () => {
                if (!user) {
                    toast({ variant: "destructive", title: "Not Authenticated", description: "You must be logged in to upload an avatar." });
                    return;
                }
                const idToken = await user.getIdToken();
                const formData = new FormData();
                formData.append('idToken', idToken);
                formData.append('avatar', file);

                const { success, error, photoURL } = await updateUserAvatarAction(formData);

                if (success && photoURL) {
                    await updateAuthProfile(user, { photoURL });
                    toast({ title: "Avatar Updated!", description: "Your new picture has been saved." });
                } else {
                     toast({ variant: "destructive", title: "Upload Failed", description: error });
                }
                setAvatarFile(null);
            });
        }
    }

    if (loading || !user) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-200px)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container py-12 md:py-20">
            <Card className="max-w-3xl mx-auto">
                <CardHeader className="text-center relative">
                     <div className="relative w-24 h-24 mx-auto group">
                        <Avatar className="w-24 h-24 border-2 border-primary">
                            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                            <AvatarFallback className="text-4xl">
                                {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="h-10 w-10" />}
                            </AvatarFallback>
                        </Avatar>
                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            {isPending && avatarFile ? <Loader2 className="h-6 w-6 text-white animate-spin" /> : <Upload className="h-6 w-6 text-white" />}
                        </button>
                        <Input 
                            type="file" 
                            ref={fileInputRef} 
                            className="hidden" 
                            accept="image/png, image/jpeg, image/jpg"
                            onChange={handleAvatarChange}
                            disabled={isPending}
                        />
                    </div>
                    <CardTitle className="text-3xl font-bold font-headline">{user.displayName}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onProfileSubmit)}>
                        <CardContent className="space-y-8">
                            <Separator />

                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                       <UserIcon className="h-5 w-5 text-primary" />
                                       About You
                                    </h3>
                                    {!isEditMode ? (
                                        <Button variant="outline" size="sm" onClick={() => setIsEditMode(true)}>
                                            <Edit className="h-4 w-4 mr-2" />Edit Details
                                        </Button>
                                    ) : (
                                         <Button size="sm" type="submit" disabled={isPending}>
                                            {isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin"/> : <Check className="h-4 w-4 mr-2" />}
                                            Save Changes
                                        </Button>
                                    )}
                                </div>
                                {!isEditMode ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                       <div className="p-4 bg-muted/50 rounded-lg">
                                           <p className="font-semibold text-muted-foreground flex items-center gap-2 mb-1"><Briefcase className="h-4 w-4"/>Professional Status</p>
                                           <p>{profile?.professionalStatus || 'Not specified'}</p>
                                       </div>
                                       <div className="p-4 bg-muted/50 rounded-lg">
                                           <p className="font-semibold text-muted-foreground flex items-center gap-2 mb-1"><Target className="h-4 w-4"/>Career Goals</p>
                                           <p>{profile?.careerGoals || 'Not specified'}</p>
                                       </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="professionalStatus"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel className="font-semibold text-muted-foreground"><Briefcase className="h-4 w-4 inline-block mr-2"/>Professional Status</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
                                                            {professionalStatuses.map(status => (
                                                                <FormItem key={status} className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl><RadioGroupItem value={status} /></FormControl>
                                                                    <FormLabel className="font-normal">{status}</FormLabel>
                                                                </FormItem>
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="careerGoals"
                                            render={({ field }) => (
                                                <FormItem className="space-y-3">
                                                    <FormLabel className="font-semibold text-muted-foreground"><Target className="h-4 w-4 inline-block mr-2"/>Career Goals</FormLabel>
                                                    <FormControl>
                                                        <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-1">
                                                            {careerGoals.map(goal => (
                                                                <FormItem key={goal} className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl><RadioGroupItem value={goal} /></FormControl>
                                                                    <FormLabel className="font-normal">{goal}</FormLabel>
                                                                </FormItem>
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                )}
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2">
                                   Settings & Help
                                </h3>
                                <div className="space-y-2">
                                   <Button variant="outline" className="w-full justify-start" onClick={handleResetPassword}>
                                       <KeyRound className="h-4 w-4 mr-2" /> Reset Password
                                   </Button>
                                   <Button variant="outline" className="w-full justify-start" onClick={() => router.push('/contact')}>
                                       <HelpCircle className="h-4 w-4 mr-2" /> Help & Contact
                                   </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-4">
                             <Separator />
                             <Button variant="destructive" className="w-full" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" /> Log Out
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
}
