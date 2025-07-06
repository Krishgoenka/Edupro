"use client";

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// TODO: Fetch course details and comments from Firestore based on the course ID.
const courseData = {
    'web-development': {
        title: 'Web Development Bootcamp',
        description: 'Master the fundamentals of web development with HTML, CSS, JavaScript, React, and Node.js. Build real-world projects.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' // Placeholder video
    },
    'speaking-skills': {
        title: 'Public Speaking Mastery',
        description: 'Boost your confidence and communication skills. Learn to deliver powerful presentations and speak with impact.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' // Placeholder video
    },
    'artificial-intelligence': {
        title: 'Artificial Intelligence A-Z',
        description: 'Dive into the world of AI. Learn about machine learning, data science, neural networks, and build your own AI models.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' // Placeholder video
    },
    'cyber-security': {
        title: 'Cyber Security Essentials',
        description: 'Protect systems and networks from digital attacks. Learn ethical hacking, cryptography, and network security.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' // Placeholder video
    },
    'data-science-python': {
        title: 'Data Science with Python',
        description: 'Learn data analysis, visualization, and machine learning with Python libraries like Pandas, NumPy, and Scikit-learn.',
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' // Placeholder video
    }
};

const comments = [
    { user: 'Alice', timestamp: '2 days ago', text: 'Great explanation of hooks!', avatar: 'https://placehold.co/40x40.png' },
    { user: 'Bob', timestamp: '1 day ago', text: 'I had a question about the server components part.', avatar: 'https://placehold.co/40x40.png' },
];

export default function CourseVideoPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const course = courseData[id as keyof typeof courseData] || { title: 'Course not found', description: '', videoUrl: '' };

  return (
    <div className="container py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-6">
                 {/* TODO: Replace with a more robust video player or YouTube/Vimeo embed */}
                <video controls className="w-full h-full" src={course.videoUrl} autoPlay={false} key={id}>
                    Your browser does not support the video tag.
                </video>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">{course.title}</CardTitle>
                    <CardDescription className="text-lg">{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Separator className="my-6" />
                    <h3 className="text-2xl font-bold font-headline mb-4">Comments</h3>
                    <div className="space-y-6">
                        {/* TODO: Implement form handling and save comments to Firestore */}
                        <div className="space-y-2">
                            <Textarea placeholder="Add your comment..."/>
                            <Button>Post Comment</Button>
                        </div>
                        <div className="space-y-4">
                            {comments.map((comment, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <Avatar>
                                        <AvatarImage src={comment.avatar} alt={comment.user} data-ai-hint="user avatar" />
                                        <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-bold">{comment.user} <span className="text-sm font-normal text-muted-foreground ml-2">{comment.timestamp}</span></p>
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: List of course videos/modules would go here */}
              <p className="text-muted-foreground">(Placeholder for course curriculum/playlist)</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
