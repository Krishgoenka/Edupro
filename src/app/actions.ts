"use server";

import { 
  analyzeResume,
  AnalyzeResumeInput, 
  AnalyzeResumeOutput 
} from "@/ai/flows/generate-course-bundle";
import {
  generatePersonalizedBundle,
  PersonalizedBundleOutput
} from '@/ai/flows/generate-personalized-bundle';
import pdf from "pdf-parse";

export async function analyzeResumeAction(
  formData: FormData
): Promise<{
  data: AnalyzeResumeOutput | null;
  error: string | null;
}> {
  try {
    const jobDescription = formData.get('jobDescription') as string;
    const resumeFile = formData.get('resume') as File;

    if (!jobDescription) {
      return { data: null, error: "Job description is missing." };
    }
    if (!resumeFile || resumeFile.size === 0) {
      return { data: null, error: "Resume file is missing or empty." };
    }

    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());
    
    const pdfData = await pdf(fileBuffer);
    const resumeText = pdfData.text;

    if (!resumeText) {
        return { data: null, error: "Could not extract text from the PDF." };
    }

    const input: AnalyzeResumeInput = {
      jobDescription,
      resumeText,
    };
    
    const result = await analyzeResume(input);
    
    // TODO: Save the result to Firestore
    // e.g., await saveToFirestore({ jobDescription, resumeFileName: resumeFile.name, result });

    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to analyze resume. ${errorMessage}` };
  }
}

export async function getPersonalizedBundleAction(
  userInput: string
): Promise<{
  data: PersonalizedBundleOutput | null;
  error: string | null;
}> {
  try {
    if (!userInput) {
      return { data: null, error: "User input is missing." };
    }

    // TODO: Add check for Firebase Auth. If not logged in, return error.
    const result = await generatePersonalizedBundle({ userInput });

    // TODO: Save the generated bundle and user input to Firestore under the user's ID.

    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to generate bundle. ${errorMessage}` };
  }
}
