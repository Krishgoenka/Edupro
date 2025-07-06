'use server';

/**
 * @fileOverview An AI agent for analyzing a resume against a job description.
 *
 * - analyzeResume - A function that handles the resume analysis process.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeInputSchema = z.object({
  jobDescription: z.string().describe('The job description text.'),
  resumeText: z.string().describe('The text extracted from the resume.'),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const AnalysisSchema = z.object({
    missingSkill: z.string().describe("A skill that is missing from the resume but required by the job description."),
    skillToAdd: z.string().describe("A corresponding skill or phrasing to add to the resume."),
});

const AnalyzeResumeOutputSchema = z.object({
  analysisTable: z.array(AnalysisSchema).describe("A table of missing skills and suggested skills to add. This should contain at least 3 items."),
  recommendations: z.array(z.string()).describe("A list of 3-5 bulleted recommendations on how the applicant can improve their resume to better align with the job description."),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;


export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an experienced technical HR manager. Your task is to review the provided resume against the job description.
First, generate a table with two columns:
- Column 1: Missing Skills
- Column 2: Skills to Add

Then, provide recommendations on how the applicant can improve their resume to better align with the job description.

Job Description:
{{{jobDescription}}}

Resume Text:
{{{resumeText}}}
`,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);