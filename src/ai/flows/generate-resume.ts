'use server';
/**
 * @fileOverview An AI agent for generating a professional resume.
 *
 * - generateResume - A function that handles resume generation.
 * - GenerateResumeInput - The input type for the generateResume function.
 * - GeneratedResume - The return type for the generateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateResumeInputSchema = z.object({
  userInput: z.string().describe('The raw text input from the user, which could be a description of their skills and experience, or the content of an existing resume or LinkedIn profile.'),
});
export type GenerateResumeInput = z.infer<typeof GenerateResumeInputSchema>;

const ExperienceSchema = z.object({
    role: z.string().describe("The job title or role."),
    company: z.string().describe("The name of the company."),
    dates: z.string().describe("The start and end dates of the employment."),
    description: z.array(z.string()).describe("A list of achievements or responsibilities in this role, each as a separate bullet point."),
});

const EducationSchema = z.object({
    degree: z.string().describe("The degree or qualification obtained."),
    institution: z.string().describe("The name of the educational institution."),
    dates: z.string().describe("The start and end dates of the education."),
});

export const GeneratedResumeSchema = z.object({
  personalDetails: z.object({
    name: z.string().describe("The full name of the person."),
    email: z.string().describe("The email address.").optional(),
    phone: z.string().describe("The phone number.").optional(),
    linkedin: z.string().describe("The URL of the LinkedIn profile.").optional(),
    github: z.string().describe("The URL of the GitHub profile.").optional(),
    location: z.string().describe("The city and country of residence.").optional(),
  }),
  summary: z.string().describe("A 2-4 sentence professional summary tailored to the user's experience."),
  experience: z.array(ExperienceSchema).describe("A list of professional experiences."),
  education: z.array(EducationSchema).describe("A list of educational qualifications."),
  skills: z.array(z.string()).describe("A list of key skills, categorized if possible (e.g., Languages, Frameworks, Tools)."),
});
export type GeneratedResume = z.infer<typeof GeneratedResumeSchema>;

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
