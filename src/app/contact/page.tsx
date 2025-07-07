
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the EduPro team. We are here to help you with any questions or feedback.',
};

export default function ContactPage() {
  return (
    <div className="container py-12 md:py-20 flex items-center justify-center min-h-[calc(100vh-250px)]">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
            <Mail className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Contact Us</CardTitle>
          <CardDescription className="text-muted-foreground md:text-lg">
            We're here to help! Whether you have a question about our courses, need assistance with your account, or want to provide feedback, please don't hesitate to reach out.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-2 font-semibold">Our support email is:</p>
          <a href="mailto:eduproesd@gmail.com" className="text-xl font-bold text-primary hover:underline">
            eduproesd@gmail.com
          </a>
          <Button asChild size="lg" className="w-full mt-6">
            <a href="mailto:eduproesd@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Send us an Email
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
