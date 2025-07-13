
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
import * as admin from 'firebase-admin';
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from 'firebase-admin/storage';


// --- Firebase Admin Initialization ---
// This ensures the server-side actions can securely communicate with your Firebase project.
if (!admin.apps.length) {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
}
// --- End of Initialization ---

const getUserId = async (idToken: string | null) => {
  if (!idToken) return null;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken.uid;
  } catch (error) {
    console.error("Error verifying ID token:", error);
  }
  return null;
}

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
    
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    let errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    if (typeof errorMessage === 'string' && (errorMessage.includes('limit') || errorMessage.includes('quota')) && errorMessage.includes('per minute')) {
        errorMessage = "You've made too many requests. Please wait a minute and try again.";
    } else {
        errorMessage = `Failed to analyze resume. ${errorMessage}`;
    }
    return { data: null, error: errorMessage };
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

    const result = await generatePersonalizedBundle({ userInput });

    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    let errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    if (typeof errorMessage === 'string' && (errorMessage.includes('API key not valid') || errorMessage.includes('GOOGLE_API_KEY'))) {
        errorMessage = "The AI service is not configured correctly. Please check your GOOGLE_API_KEY in the .env.local file and restart the server.";
    } else if (typeof errorMessage === 'string' && (errorMessage.includes('limit') || errorMessage.includes('quota')) && errorMessage.includes('per minute')) {
        errorMessage = "You've made too many requests. Please wait a minute and try again.";
    } else {
        errorMessage = `Failed to generate bundle. ${errorMessage}`;
    }
    return { data: null, error: errorMessage };
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
    const idToken = formData.get('idToken') as string | null;

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

    const userId = await getUserId(idToken);
    if (userId) {
      const db = getFirestore();
      const resumeRef = db.collection('resumes').doc();
      const resumeWithMeta = {
        ...result,
        userId: userId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        resumeId: resumeRef.id,
      };
      await resumeRef.set(resumeWithMeta);
      // Return the data with server-generated fields
      return { data: { ...resumeWithMeta, createdAt: new Date() }, error: null };
    }

    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    let errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    if (typeof errorMessage === 'string' && (errorMessage.includes('limit') || errorMessage.includes('quota')) && errorMessage.includes('per minute')) {
        errorMessage = "You've made too many requests. Please wait a minute and try again.";
    } else {
        errorMessage = `Failed to generate resume. ${errorMessage}`;
    }
    return { data: null, error: errorMessage };
  }
}


export async function updateUserProfileAction(formData: FormData): Promise<{ success: boolean; error: string | null; }> {
    const idToken = formData.get('idToken') as string | null;
    const professionalStatus = formData.get('professionalStatus') as string;
    const careerGoals = formData.get('careerGoals') as string;

    const userId = await getUserId(idToken);
    if (!userId) {
        return { success: false, error: 'Authentication failed. Please log in again.' };
    }

    try {
        const db = getFirestore();
        const userRef = db.collection('users').doc(userId);
        await userRef.update({
            professionalStatus,
            careerGoals
        });
        return { success: true, error: null };
    } catch (error) {
        console.error("Error updating user profile:", error);
        return { success: false, error: 'Failed to update profile. Please try again.' };
    }
}

export async function updateUserAvatarAction(formData: FormData): Promise<{ success: boolean; error: string | null, photoURL?: string }> {
    const idToken = formData.get('idToken') as string | null;
    const avatarFile = formData.get('avatar') as File;

    const userId = await getUserId(idToken);
    if (!userId) {
        return { success: false, error: 'Authentication failed. Please log in again.' };
    }

    if (!avatarFile) {
        return { success: false, error: 'No image file provided.' };
    }

    try {
        const bucket = getStorage().bucket();
        const filePath = `avatars/${userId}/${avatarFile.name}`;
        const file = bucket.file(filePath);

        const fileBuffer = Buffer.from(await avatarFile.arrayBuffer());

        await file.save(fileBuffer, {
            metadata: {
                contentType: avatarFile.type,
            },
        });
        
        await file.makePublic();
        const publicUrl = file.publicUrl();

        await admin.auth().updateUser(userId, {
            photoURL: publicUrl
        });

        return { success: true, error: null, photoURL: publicUrl };
    } catch (error) {
        console.error("Error updating user avatar:", error);
        return { success: false, error: 'Failed to update avatar. Please try again.' };
    }
}
