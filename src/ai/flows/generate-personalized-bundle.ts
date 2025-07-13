'use server';

/**
 * @fileOverview An AI agent for creating personalized course bundles.
 *
 * - generatePersonalizedBundle - Creates a course bundle based on user goals.
 * - PersonalizedBundleInput - The input type.
 * - PersonalizedBundleOutput - The return type.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { courses } from '@/lib/courses-data';
import type { Course, CourseSegment } from '@/lib/courses-data';

const PersonalizedBundleInputSchema = z.object({
  userInput: z.string().describe("The user's background, goals, and weaknesses."),
  courseList: z.string().describe('A JSON string of available courses for the AI to choose from. Each course contains a list of its segments/sub-topics.')
});
export type PersonalizedBundleInput = z.infer<typeof PersonalizedBundleInputSchema>;

const RecommendedCourseSchema = z.object({
    id: z.string().describe("The unique ID of the recommended course."),
    title: z.string().describe("The title of the recommended course."),
    price: z.number().describe("The price of the recommended course."),
    reason: z.string().describe("A short, one-sentence reason why this course was recommended for the user."),
});

const RecommendedSegmentSchema = z.object({
    segmentId: z.string().describe("The unique ID of the recommended course segment/sub-topic."),
    title: z.string().describe("The title of the recommended segment."),
    price: z.number().describe("The price of the recommended segment."),
    reason: z.string().describe("A short, one-sentence reason why this segment was recommended for the user."),
    sourceCourse: z.object({
        id: z.string().describe("The ID of the course this segment is from."),
        title: z.string().describe("The title of the course this segment is from."),
    }).describe("The original course from which this segment was unlocked."),
});

const PersonalizedBundleOutputSchema = z.object({
  recommendedCourses: z.array(RecommendedCourseSchema).describe("A bundle of full courses. Aim for 1-2 courses."),
  recommendedSegments: z.array(RecommendedSegmentSchema).describe("A list of individual course segments (sub-topics) unlocked from other courses to fill specific skill gaps. Aim for 1-2 segments if the user's need is very specific and not covered by a full course."),
  bundleSummary: z.string().describe("A brief, encouraging summary explaining why this combination of courses and segments is a good fit for the user."),
});
export type PersonalizedBundleOutput = z.infer<typeof PersonalizedBundleOutputSchema>;

export async function generatePersonalizedBundle(input: { userInput: string }): Promise<PersonalizedBundleOutput> {
  const simplifiedCourses = courses.map(course => ({
      id: course.id,
      title: course.title,
      description: course.description,
      domain: course.domain,
      category: course.category,
      price: course.price,
      curriculum: course.curriculum.map(segment => ({
          segmentId: segment.segmentId,
          title: segment.title,
          price: segment.price,
          keywords: segment.keywords,
      }))
  }));

  const flowInput: PersonalizedBundleInput = {
    userInput: input.userInput,
    courseList: JSON.stringify(simplifiedCourses)
  };
  return personalizedBundleFlow(flowInput);
}

const prompt = ai.definePrompt({
    name: 'personalizedBundlePrompt',
    input: { schema: PersonalizedBundleInputSchema },
    output: { schema: PersonalizedBundleOutputSchema },
    prompt: `You are an expert career counselor and course advisor for an e-learning platform called EduPro.
Your task is to create a personalized course bundle for a user based on their input.

User's goals and background:
"{{{userInput}}}"

Here is the list of available courses and their individual segments (sub-topics) you can choose from:
\`\`\`json
{{{courseList}}}
\`\`\`

Analyze the user's needs and the available courses/segments. Create a tailored bundle.
Your goal is to provide the most relevant learning path. You can do this by:
1. Recommending a full course if it's a good overall match for the user's primary goal.
2. If a user has a very specific need (e.g., "English confidence") that is just one part of a larger course (e.g., "Professional Communication"), recommend ONLY that specific segment/sub-topic from the larger course. This provides a more targeted and affordable solution.

The final bundle should contain a mix of 1-2 full courses and/or 1-2 individual segments.
- For each full course, provide its ID, title, price, and a compelling one-sentence reason.
- For each recommended segment, provide its segmentId, title, price, the reason, and the source course (id and title) it comes from.
- Also, write a brief, encouraging summary for the entire bundle.

Do not recommend items that are not in the provided list. Focus on creating the most logical and effective learning path for the user.`,
});

const personalizedBundleFlow = ai.defineFlow(
    {
        name: 'personalizedBundleFlow',
        inputSchema: PersonalizedBundleInputSchema,
        outputSchema: PersonalizedBundleOutputSchema,
    },
    async (input) => {
        const { output } = await prompt(input);
        return output!;
    }
);
