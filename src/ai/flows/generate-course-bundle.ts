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
  resumeText: z.string().optional().describe('The text extracted from the resume if it was a text-based file (PDF, DOCX).'),
  resumeDataUri: z.string().optional().describe("An image of the resume, as a data URI if it was an image file.")
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const AnalysisSchema = z.object({
    missingSkill: z.string().describe("A skill that is missing from the resume but required by the job description."),
    suggestedImprovement: z.string().describe("A corresponding skill or phrasing to add to the resume to address the missing skill."),
});

const AnalyzeResumeOutputSchema = z.object({
  matchPercentage: z.number().min(0).max(100).describe("A percentage (0-100) representing how well the resume matches the job description, rounded to the nearest integer."),
  revisedSummary: z.string().describe("An improved professional summary for the resume, rewritten to be 2-4 sentences long and tailored to the job description."),
  analysisTable: z.array(AnalysisSchema).describe("A table of missing skills and suggested improvements. This should contain at least 3 items."),
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
The resume is provided either as text or as an image. Use the available information to perform your analysis.

Analyze the resume and job description to generate the following:
1.  A match percentage (0-100) indicating how well the resume aligns with the job description.
2.  A rewritten, improved professional summary (2-4 sentences) that is tailored to the job description.
3.  A table with two columns:
    - Column 1: Missing Skill (skills required by the job but missing from the resume)
    - Column 2: Suggested Improvement (how to phrase this skill on the resume)
4.  A list of 3-5 actionable recommendations for overall resume improvement.

Job Description:
{{{jobDescription}}}

{{#if resumeText}}
Resume Text:
{{{resumeText}}}
{{/if}}

{{#if resumeDataUri}}
Resume Content (Image):
{{media url=resumeDataUri}}
{{/if}}
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
