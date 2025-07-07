import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Validate the Google AI API key. This provides a clear warning if the key
// is missing, which is a common source of errors.
if (!process.env.GOOGLE_API_KEY) {
  console.warn(
    'WARNING: The GOOGLE_API_KEY environment variable is not set. AI features will not work. Please get a key from Google AI Studio and add it to your .env file.'
  );
}

export const ai = genkit({
  plugins: [googleAI({
    apiKey: process.env.GOOGLE_API_KEY
  })],
  model: 'googleai/gemini-2.0-flash',
});
