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
  prompt: `You are a professional resume writer and career coach. Your task is to create or modify a well-structured, professional resume in JSON format based on the text provided by the user.

The user's input might contain instructions and/or the raw content of a resume.

First, analyze the user's input to see if they have provided specific instructions for changes.
- If the user provides instructions (e.g., "update my last job title", "add this project", "rewrite my summary to be more focused on AI"), you MUST apply those changes to the provided resume content.
- If the user provides only raw text about themselves or a resume to be parsed without specific instructions, your job is to simply parse it, clean it up, and organize it into the specified JSON structure.

Your goal is to produce a single, coherent, and professional resume based on all the information given.

- Extract personal details like name, email, phone, and professional links.
- Write a concise and impactful professional summary.
- Detail work experience with roles, companies, dates, and bullet-pointed achievements.
- List education history clearly.
- Organize skills into a clean list.

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
