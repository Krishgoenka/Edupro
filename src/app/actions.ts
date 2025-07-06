"use server";

import { 
  generateAICourseBundle, 
  GenerateAICourseBundleInput, 
  GenerateAICourseBundleOutput 
} from "@/ai/flows/generate-course-bundle";

export async function getCourseBundleAction(
  input: GenerateAICourseBundleInput
): Promise<{
  data: GenerateAICourseBundleOutput | null;
  error: string | null;
}> {
  try {
    const result = await generateAICourseBundle(input);
    return { data: result, error: null };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to generate course bundle. ${errorMessage}` };
  }
}
