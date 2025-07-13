
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { Loader2 } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = React.useTransition();
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handlePasswordReset = async () => {
    const email = form.getValues("email");
    if (!email) {
      toast({
        variant: "destructive",
        title: "Email Required",
        description: "Please enter your email address in the form to reset your password.",
      });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: "Password Reset Email Sent",
        description: `If an account exists for ${email}, you will receive a password reset link.`,
      });
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not send password reset email. Please try again later.",
      });
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({
          title: "Success!",
          description: "You've been logged in.",
        });
        router.push("/dashboard");
      } catch (error: any) {
        let description = "An unknown error occurred. Please try again.";
        if (error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-credentials') {
            description = "The email or password you entered is incorrect. Please check your credentials and try again.";
        } else if (error.code === 'auth/operation-not-allowed') {
            description = "Email/Password sign-in is not enabled. Please enable it in your Firebase console's Authentication section.";
        } else if (error.message) {
            description = error.message;
        }
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: description,
        });
      }
    });
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      toast({
        title: "Success!",
        description: "You've been logged in.",
      });
      router.push("/dashboard");
    } catch (error: any) {
      let description = "An unknown error occurred. Please try again.";
      if (error.code === 'auth/operation-not-allowed') {
          description = "Google sign-in is not enabled. Please enable it in your Firebase console's Authentication section.";
      } else if (error.message) {
          description = error.message;
      }
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: description,
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Log In</CardTitle>
          <CardDescription>Enter your email below to log in to your account.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="m@example.com" {...field} disabled={isPending || isGoogleLoading}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                       <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button type="button" className="text-sm font-medium text-primary hover:underline underline-offset-4">
                              Forgot Password?
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Reset Password?</AlertDialogTitle>
                              <AlertDialogDescription>
                                We will send a password reset link to the email address you entered. Make sure it's correct.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handlePasswordReset}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <FormControl>
                      <Input type="password" {...field} disabled={isPending || isGoogleLoading}/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending || isGoogleLoading}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Log In
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isPending || isGoogleLoading}>
            {isGoogleLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.google className="mr-2 h-4 w-4" />
            )}
            Google
          </Button>
        </CardContent>
        <div className="mt-4 p-6 pt-0 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
