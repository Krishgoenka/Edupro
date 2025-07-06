'use server';

/**
 * @fileOverview AI-powered course bundle generator based on resume analysis and skill gap identification.
 *
 * - generateAICourseBundle - A function that takes a resume and job role as input and returns a course bundle.
 * - GenerateAICourseBundleInput - The input type for the generateAICourseBundle function.
 * - GenerateAICourseBundleOutput - The return type for the generateAICourseBundle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAICourseBundleInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobRole: z.string().describe('The trending job role to match against.'),
});
export type GenerateAICourseBundleInput = z.infer<typeof GenerateAICourseBundleInputSchema>;

const CourseSchema = z.object({
  title: z.string().describe('The title of the course.'),
  description: z.string().describe('A brief description of the course.'),
  thumbnail: z.string().describe('URL of the course thumbnail image.'),
  url: z.string().url().describe('URL of the course.'),
});

const GenerateAICourseBundleOutputSchema = z.object({
  skillGaps: z.array(z.string()).describe('List of skills missing from the resume compared to the job role.'),
  suggestedCourses: z.array(CourseSchema).describe('A list of suggested courses to address the skill gaps.'),
});
export type GenerateAICourseBundleOutput = z.infer<typeof GenerateAICourseBundleOutputSchema>;

export async function generateAICourseBundle(input: GenerateAICourseBundleInput): Promise<GenerateAICourseBundleOutput> {
  return generateAICourseBundleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAICourseBundlePrompt',
  input: {schema: GenerateAICourseBundleInputSchema},
  output: {schema: GenerateAICourseBundleOutputSchema},
  prompt: `You are an AI career coach. A user will provide their resume and a job role that they are interested in. You will analyze the resume, compare it to the requirements of the job role, identify skill gaps, and suggest a course bundle to address these gaps.

Resume:
{{resumeText}}

Job Role:
{{jobRole}}

Analyze the resume, compare it to the job role, identify skill gaps, and suggest a course bundle with at least 3 courses to address these gaps.  The suggested courses should have a title, a brief description, a thumbnail URL, and a course URL.  Return the skill gaps as a list of strings.

Ensure that the course bundle is tailored to address the specific skills gaps identified in the resume.

{{output}}`,
});

const generateAICourseBundleFlow = ai.defineFlow(
  {
    name: 'generateAICourseBundleFlow',
    inputSchema: GenerateAICourseBundleInputSchema,
    outputSchema: GenerateAICourseBundleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
