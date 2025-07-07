
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the passionate team behind EduPro, dedicated to revolutionizing personalized education and career guidance through AI.',
};

const teamMembers = [
  { name: 'Krish Goenka', role: 'Founder & CEO', image: 'https://placehold.co/400x400.png', dataAiHint: 'person portrait' },
  { name: 'Samrat Ghosh', role: 'Chief Technology Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'person portrait' },
  { name: 'Rohit Gupta', role: 'Chief Financial Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'person portrait' },
  { name: 'Sanjana Prasad', role: 'Chief Operating Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'person portrait' },
  { name: 'Dev Kumar', role: 'Chief Product Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'person portrait' },
  { name: 'Md Habib Alam', role: 'Chief Marketing Officer', image: 'https://placehold.co/400x400.png', dataAiHint: 'person portrait' },
];

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20">
      <section id="about-intro" className="mb-20">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline text-primary">About EduPro</h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              EduPro was founded on the belief that everyone deserves access to a fulfilling career. In a fast-changing job market, it's hard to know which skills to learn. We leverage the power of AI to provide clear, personalized, and actionable guidance, helping you invest in your education wisely and achieve your professional dreams.
            </p>
          </div>
        </div>
      </section>

      <section id="team">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Meet Our Team</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-2">
                The passionate individuals leading EduPro to revolutionize personalized education.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.dataAiHint} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold font-headline">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
