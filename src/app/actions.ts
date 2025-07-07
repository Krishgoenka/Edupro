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
import { 
  generateResume,
  GenerateResumeInput,
  GeneratedResume
} from "@/ai/flows/generate-resume";
import pdf from "pdf-parse";
import mammoth from "mammoth";


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
    const fileType = resumeFile.type;

    let resumeText: string | undefined = undefined;
    let resumeDataUri: string | undefined = undefined;

    if (fileType === 'application/pdf') {
      const pdfData = await pdf(fileBuffer);
      resumeText = pdfData.text;
    } else if (fileType.startsWith('image/')) {
      resumeDataUri = `data:${fileType};base64,${fileBuffer.toString('base64')}`;
    } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // .docx
      const mammothResult = await mammoth.extractRawText({ buffer: fileBuffer });
      resumeText = mammothResult.value;
    } else {
      return { data: null, error: "Unsupported file type. Please upload a PDF, DOCX, or image file." };
    }

    if (!resumeText && !resumeDataUri) {
        return { data: null, error: "Could not extract content from the file." };
    }

    const input: AnalyzeResumeInput = {
      jobDescription,
      resumeText,
      resumeDataUri
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

export async function generateResumeAction(
  formData: FormData
): Promise<{
  data: GeneratedResume | null;
  error: string | null;
}> {
  try {
    const userInput = formData.get('userInput') as string;
    const resumeFile = formData.get('resumeFile') as File | null;

    let resumeDataUri: string | undefined = undefined;
    let combinedUserInput = userInput;

    if (resumeFile && resumeFile.size > 0) {
        const fileBuffer = Buffer.from(await resumeFile.arrayBuffer());
        const fileType = resumeFile.type;

        if (fileType.startsWith('image/')) {
            resumeDataUri = `data:${fileType};base64,${fileBuffer.toString('base64')}`;
        } else {
            let extractedText = '';
            if (fileType === "application/pdf") {
                const pdfData = await pdf(fileBuffer);
                extractedText = pdfData.text;
            } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') { // .docx
                const mammothResult = await mammoth.extractRawText({ buffer: fileBuffer });
                extractedText = mammothResult.value;
            } else {
                return { data: null, error: "Unsupported file type. Please upload a PDF, DOCX, or image file." };
            }
            
            combinedUserInput = userInput ? `${userInput}\n\n---RESUME CONTENT---\n\n${extractedText}` : extractedText;
        }
    }

    if (!combinedUserInput && !resumeDataUri) {
      return { data: null, error: "No input provided. Please type your details or upload a file." };
    }

    const input: GenerateResumeInput = {
      userInput: combinedUserInput,
      resumeDataUri,
    };
    
    const result = await generateResume(input);

    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to generate resume. ${errorMessage}` };
  }
}
