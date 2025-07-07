'use server';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Validate the Google AI API key. This provides a clear error if the key
// is missing, which is a common source of problems.
if (!process.env.GOOGLE_API_KEY) {
  throw new Error(
    'CRITICAL: The GOOGLE_API_KEY environment variable is not set. AI features will not work. Please get a key from Google AI Studio, add it to your .env.local file, and restart the development server.'
  );
}

export const ai = genkit({
  plugins: [googleAI({
    apiKey: process.env.GOOGLE_API_KEY
  })],
  model: 'googleai/gemini-2.0-flash',
});
