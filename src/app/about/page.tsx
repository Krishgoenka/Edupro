
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the passionate team behind EduPro, dedicated to revolutionizing personalized education and career guidance through AI.',
};

const teamMembers = [
  { name: 'Krish Goenka', role: 'Founder & CEO', image: '/krish.jpg', dataAiHint: 'person portrait' },
  { name: 'Sanjana Prasad', role: 'Chief Operating Officer', image: '/sanjana.jpg', dataAiHint: 'person portrait' },
  { name: 'Samrat Ghosh', role: 'Chief Technology Officer', image: '/samrat.jpg', dataAiHint: 'person portrait' },
  { name: 'Rohit Gupta', role: 'Chief Financial Officer', image: '/rohit.jpg', dataAiHint: 'person portrait' },
  { name: 'Dev Kumar', role: 'Chief Product Officer', image: '/dev.jpg', dataAiHint: 'person portrait' },
  { name: 'Md Habib Alam', role: 'Chief Marketing Officer', image: '/habib.jpg', dataAiHint: 'person portrait' },
];

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-20 animate-in fade-in duration-500">
      <section id="about-intro" className="mb-20">
        <Card className="animate-in fade-in zoom-in-95 duration-500">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline text-primary">About EduPro</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mx-auto max-w-[700px] text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              EduPro was founded on the belief that everyone deserves access to a fulfilling career. In a fast-changing job market, it's hard to know which skills to learn. We leverage the power of AI to provide clear, personalized, and actionable guidance, helping you invest in your education wisely and achieve your professional dreams.
            </p>
          </CardContent>
        </Card>
      </section>

      <section id="team">
        <div className="text-center mb-12 animate-in fade-in-up duration-500" style={{ animationDelay: `200ms` }}>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Meet Our Team</h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-2">
                The passionate individuals leading EduPro to revolutionize personalized education.
            </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.name} 
              className="text-center flex flex-col items-center animate-in fade-in-up duration-500"
              style={{ animationDelay: `${300 + 100 * index}ms` }}
            >
                <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={member.image} alt={member.name} className={`object-cover ${member.name === 'Samrat Ghosh' ? 'object-top' : ''}`} />
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
