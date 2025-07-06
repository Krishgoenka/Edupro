'use server';

/**
 * @fileOverview An AI agent for creating personalized course bundles.
 *
 * - generatePersonalizedBundle - Creates a course bundle based on user goals.
 * - PersonalizedBundleInput - The input type.
 * - PersonalizedBundleOutput - The return type.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { courses } from '@/lib/courses-data';

const PersonalizedBundleInputSchema = z.object({
  userInput: z.string().describe("The user's background, goals, and weaknesses."),
  courseList: z.string().describe('A JSON string of available courses for the AI to choose from.')
});
export type PersonalizedBundleInput = z.infer<typeof PersonalizedBundleInputSchema>;

const RecommendedCourseSchema = z.object({
    id: z.string().describe("The unique ID of the recommended course."),
    title: z.string().describe("The title of the recommended course."),
    price: z.number().describe("The price of the recommended course."),
    reason: z.string().describe("A short, one-sentence reason why this course was recommended for the user."),
});

const PersonalizedBundleOutputSchema = z.object({
  recommendedCourses: z.array(RecommendedCourseSchema).describe("A bundle of 2-3 courses. Must include one primary technical/domain course and at least one soft skill course."),
  bundleSummary: z.string().describe("A brief, encouraging summary explaining why this bundle is a good fit for the user."),
});
export type PersonalizedBundleOutput = z.infer<typeof PersonalizedBundleOutputSchema>;

export async function generatePersonalizedBundle(input: { userInput: string }): Promise<PersonalizedBundleOutput> {
  const flowInput: PersonalizedBundleInput = {
    userInput: input.userInput,
    courseList: JSON.stringify(courses.map(c => ({id: c.id, title: c.title, description: c.description, domain: c.domain, category: c.category, price: c.price})))
  };
  return personalizedBundleFlow(flowInput);
}

const prompt = ai.definePrompt({
    name: 'personalizedBundlePrompt',
    input: { schema: PersonalizedBundleInputSchema },
    output: { schema: PersonalizedBundleOutputSchema },
    prompt: `You are an expert career counselor and course advisor for an e-learning platform called EduPro.
Your task is to create a personalized course bundle for the user based on their input.

User's goals and background:
"{{{userInput}}}"

Here is the list of available courses you can choose from:
\`\`\`json
{{{courseList}}}
\`\`\`

Analyze the user's needs and the available courses. Create a tailored bundle of 2-3 courses.
The bundle MUST include:
1.  One primary technical or domain-specific course that directly addresses their main goal.
2.  At least one soft skill course (e.g., communication, confidence, resume writing) that supports their career development.

For each recommended course, provide its ID, title, price, and a compelling one-sentence reason for its inclusion.
Also, write a brief, encouraging summary for the entire bundle.
Do not recommend courses that are not in the provided list.
Focus on creating a logical and effective learning path for the user.`,
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
