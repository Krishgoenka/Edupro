import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const allCourses = [
    { id: 1, title: 'Advanced React for Senior Engineers', category: 'Web Development', image: 'https://placehold.co/600x400.png', rating: 4.8, reviews: 1250, price: 4999, dataAiHint: "code abstract" },
    { id: 2, title: 'Data Science with Python: Zero to Hero', category: 'Data Science', image: 'https://placehold.co/600x400.png', rating: 4.9, reviews: 3421, price: 7999, dataAiHint: "data visualization" },
    { id: 3, title: 'Product Management Essentials', category: 'Business', image: 'https://placehold.co/600x400.png', rating: 4.7, reviews: 890, price: 6499, dataAiHint: "team meeting" },
    { id: 4, title: 'UI/UX Design Masterclass', category: 'Design', image: 'https://placehold.co/600x400.png', rating: 4.8, reviews: 2100, price: 5999, dataAiHint: "design process" },
    { id: 5, title: 'Introduction to Cloud Computing', category: 'Web Development', image: 'https://placehold.co/600x400.png', rating: 4.6, reviews: 1500, price: 3999, dataAiHint: "cloud servers" },
    { id: 6, title: 'Machine Learning A-Z', category: 'Data Science', image: 'https://placehold.co/600x400.png', rating: 4.9, reviews: 5000, price: 9999, dataAiHint: "neural network" },
    { id: 7, title: 'Agile & Scrum Fundamentals', category: 'Business', image: 'https://placehold.co/600x400.png', rating: 4.7, reviews: 950, price: 2999, dataAiHint: "collaboration project" },
    { id: 8, title: 'Figma for UI Designers', category: 'Design', image: 'https://placehold.co/600x400.png', rating: 4.8, reviews: 1800, price: 4999, dataAiHint: "mobile design" },
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

            {/* Placeholder for filters */}
            <div className="flex justify-center gap-4 mb-8">
                <p className="text-muted-foreground">(Filters for category, level, and price will go here)</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allCourses.map(course => (
                    <Link key={course.id} href={`/courses/${course.id}`} className="block">
                        <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                                <p className="text-sm font-medium text-primary mb-1">{course.category}</p>
                                <CardTitle className="text-lg font-bold font-headline mb-2 leading-tight">{course.title}</CardTitle>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <span className="font-bold text-amber-500">{course.rating}</span>
                                    <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                                    <span>({course.reviews.toLocaleString()} reviews)</span>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <p className="text-xl font-bold font-headline">₹{course.price.toLocaleString()}</p>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
