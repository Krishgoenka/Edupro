import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { courses } from '@/lib/courses-data';

// TODO: Replace this with actual user data from Firestore
const userHasCourses = true; // Set to false to see the empty state
const myCourseIds = ['web-development-bootcamp', 'public-speaking-mastery', 'ai-a-z', 'cyber-security-essentials', 'data-science-python', 'digital-marketing-masterclass', 'graphic-design-fundamentals', 'project-management-pmp'];

const myCourses = courses.filter(c => myCourseIds.includes(c.id)).map((course, index) => {
    const progressValues = [45, 0, 100, 20, 0, 75, 10, 90];
    const statusValues = ["In Progress", "Not Started", "Completed", "In Progress", "Not Started", "In Progress", "In Progress", "In Progress"];
    return {
        ...course,
        progress: progressValues[index % progressValues.length],
        status: statusValues[index % statusValues.length],
    };
});

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
                                    <Link href={`/dashboard/course/${course.id}`}>
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
                                            {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Course'}
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
