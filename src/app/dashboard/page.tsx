import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// TODO: Replace this with actual user data from Firestore
const userHasCourses = true; // Set to false to see the empty state
const myCourses = [
    { 
        id: 'web-development', 
        title: 'Web Development Bootcamp', 
        image: 'https://placehold.co/600x400.png', 
        dataAiHint: "web development code",
        status: 'In Progress',
        progress: 45,
    },
    { 
        id: 'speaking-skills', 
        title: 'Public Speaking Mastery',
        image: 'https://placehold.co/600x400.png', 
        dataAiHint: "public speaking presentation",
        status: 'Not Started',
        progress: 0,
    },
];

export default function DashboardPage() {
    // TODO: Fetch user's enrolled courses from Firestore
    
    return (
        <div className="container py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Your Dashboard</h1>
                <p className="text-muted-foreground md:text-xl mt-2">Welcome back! Continue your learning journey.</p>
            </div>

            <section>
                <h2 className="text-3xl font-bold font-headline mb-6">My Courses</h2>
                {userHasCourses ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {myCourses.map(course => (
                            <Card key={course.id} className="overflow-hidden h-full flex flex-col">
                                <CardHeader className="p-0">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        width={600}
                                        height={400}
                                        className="object-cover"
                                        data-ai-hint={course.dataAiHint}
                                    />
                                </CardHeader>
                                <CardContent className="p-4 flex-grow">
                                    <CardTitle className="text-lg font-bold font-headline mb-2 leading-tight">{course.title}</CardTitle>
                                    <div className="space-y-2">
                                        <p className="text-sm text-muted-foreground">Status: <span className="font-medium text-foreground">{course.status}</span></p>
                                        <Progress value={course.progress} className="h-2" />
                                        <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button asChild className="w-full">
                                        <Link href={`/dashboard/course/${course.id}`}>
                                            {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
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
        </div>
    );
}