import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function DashboardPage() {
    return (
        <div className="container py-12">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Your Dashboard</CardTitle>
                    <CardDescription>Welcome back! This is your personal learning space.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">
                            Personalized course recommendations, progress tracking, and gamification features are coming soon.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
