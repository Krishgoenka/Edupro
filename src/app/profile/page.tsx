
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Loader2, User as UserIcon, LogOut, KeyRound, HelpCircle, Briefcase, Target, Edit } from 'lucide-react';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function ProfilePage() {
    const { user, profile, loading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

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
                <CardHeader className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4 border-2 border-primary">
                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                        <AvatarFallback className="text-4xl">
                            {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserIcon className="h-10 w-10" />}
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-3xl font-bold font-headline">{user.displayName}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <Separator />

                    <div className="space-y-4">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                           <UserIcon className="h-5 w-5 text-primary" />
                           About You
                        </h3>
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
                         {/* TODO: Add edit functionality for onboarding data */}
                        <Button variant="outline" size="sm" disabled><Edit className="h-4 w-4 mr-2" />Edit Details (Soon)</Button>
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

                    <Separator />
                    
                    <Button variant="destructive" className="w-full" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" /> Log Out
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
