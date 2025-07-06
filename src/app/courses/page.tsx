import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const courses = [
    { 
        id: 'web-development', 
        title: 'Web Development Bootcamp', 
        description: 'Master the fundamentals of web development with HTML, CSS, JavaScript, React, and Node.js. Build real-world projects.',
        image: 'https://placehold.co/600x400.png', 
        price: 499, 
        dataAiHint: "code editor" 
    },
    { 
        id: 'artificial-intelligence', 
        title: 'Artificial Intelligence A-Z', 
        description: 'Dive into the world of AI. Learn about machine learning, data science, neural networks, and build your own AI models.',
        image: 'https://placehold.co/600x400.png', 
        price: 599, 
        dataAiHint: "robot brain" 
    },
    { 
        id: 'cyber-security', 
        title: 'Cyber Security Essentials', 
        description: 'Protect systems and networks from digital attacks. Learn ethical hacking, cryptography, and network security.',
        image: 'https://placehold.co/600x400.png', 
        price: 599, 
        dataAiHint: "digital lock" 
    },
    { 
        id: 'speaking-skills', 
        title: 'Public Speaking Mastery',
        description: 'Boost your confidence and communication skills. Learn to deliver powerful presentations and speak with impact.',
        image: 'https://placehold.co/600x400.png', 
        price: 499, 
        dataAiHint: "person stage" 
    },
    {
        id: 'data-science-python',
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning with Python libraries like Pandas, NumPy, and Scikit-learn.',
        image: 'https://placehold.co/600x400.png',
        price: 799,
        dataAiHint: "data chart"
    },
    {
        id: 'digital-marketing',
        title: 'Digital Marketing Masterclass',
        description: 'Master SEO, SEM, social media marketing, and content strategy to grow businesses online.',
        image: 'https://placehold.co/600x400.png',
        price: 699,
        dataAiHint: "marketing graph"
    },
    {
        id: 'graphic-design',
        title: 'Graphic Design Fundamentals',
        description: 'Understand the principles of design, color theory, typography, and create stunning visuals using Adobe tools.',
        image: 'https://placehold.co/600x400.png',
        price: 549,
        dataAiHint: "design sketch"
    },
    {
        id: 'project-management',
        title: 'Project Management Professional (PMP)',
        description: 'Prepare for the PMP certification exam. Learn about project lifecycles, risk management, and Agile methodologies.',
        image: 'https://placehold.co/600x400.png',
        price: 899,
        dataAiHint: "task board"
    },
    {
        id: 'financial-analyst',
        title: 'The Complete Financial Analyst Course',
        description: 'Learn financial modeling, valuation, and Excel skills to become a top financial analyst.',
        image: 'https://placehold.co/600x400.png',
        price: 799,
        dataAiHint: "finance chart"
    },
    {
        id: 'photography-basics',
        title: 'Photography for Beginners',
        description: 'Master your camera settings, composition, and editing techniques to take breathtaking photos.',
        image: 'https://placehold.co/600x400.png',
        price: 499,
        dataAiHint: "camera photo"
    }
];

export default function CoursesPage() {
    return (
        <div className="container py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">Explore All Courses</h1>
                <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-2">
                    Find the perfect course to advance your skills and career.
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {courses.map(course => (
                    <Card key={course.id} className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <CardHeader className="p-0">
                            <Link href={`/courses/${course.id}`} className="block">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    width={600}
                                    height={400}
                                    className="object-cover"
                                    data-ai-hint={course.dataAiHint}
                                />
                            </Link>
                        </CardHeader>
                        <CardContent className="p-4 flex-grow">
                            <CardTitle className="text-lg font-bold font-headline mb-2 leading-tight">
                                <Link href={`/courses/${course.id}`} className="hover:text-primary">{course.title}</Link>
                            </CardTitle>
                            <CardDescription>{course.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between items-center">
                            <p className="text-xl font-bold font-headline">₹{course.price}</p>
                            {/* 
                              TODO: Implement Firebase Auth check.
                              If user is not logged in, clicking this button should redirect to '/login'.
                              If logged in, it should trigger a function to add the course to the user's data in Firestore
                              and then redirect to '/dashboard'.
                            */}
                            <Button asChild>
                                <Link href="/dashboard">Buy Course</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
