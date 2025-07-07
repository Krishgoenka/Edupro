'use server';
/**
 * @fileOverview An AI agent for generating a professional resume.
 *
 * - generateResume - A function that handles resume generation.
 * - GenerateResumeInput - The input type for the generateResume function.
 * - GeneratedResume - The return type for the generateResume function.
 */

import {ai} from '@/ai/genkit';
import { 
    GenerateResumeInputSchema, 
    GeneratedResumeSchema,
    type GenerateResumeInput, 
    type GeneratedResume,
} from '@/ai/schemas/resume';

export type { GenerateResumeInput, GeneratedResume };

export async function generateResume(input: GenerateResumeInput): Promise<GeneratedResume> {
  return generateResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumePrompt',
  input: {schema: GenerateResumeInputSchema},
  output: {schema: GeneratedResumeSchema},
  prompt: `You are a professional resume writer and career coach. Your task is to create a well-structured, professional resume in JSON format based on the raw text provided by the user.

The user's input may be messy, incomplete, or copied from a PDF. Your job is to parse it, clean it up, and organize it into the specified JSON structure.

- Extract personal details like name, email, phone, and professional links. If not present, make them optional.
- Write a concise and impactful professional summary.
- Detail work experience with roles, companies, dates, and bullet-pointed achievements.
- List education history clearly.
- Organize skills into a clean list. If the user provides categories, maintain them.

User Input:
{{{userInput}}}
`,
});

const generateResumeFlow = ai.defineFlow(
  {
    name: 'generateResumeFlow',
    inputSchema: GenerateResumeInputSchema,
    outputSchema: GeneratedResumeSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
