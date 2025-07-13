
import { z } from 'zod';

export const GenerateResumeInputSchema = z.object({
  userInput: z.string().describe('The raw text input from the user, which could be a description of their skills and experience, or the content of an existing resume (from PDF/DOCX) or LinkedIn profile, or modification instructions for an uploaded file.'),
  resumeDataUri: z.string().optional().describe("An image of the resume to be parsed, as a data URI. This is used if the resume is an image file."),
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
  userId: z.string().optional(),
  createdAt: z.any().optional(),
  resumeId: z.string().optional(),
});
export type GeneratedResume = z.infer<typeof GeneratedResumeSchema>;
