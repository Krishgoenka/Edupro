
import 'dotenv/config';
import {genkit, GenkitPlugin} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Validate the Google AI API key. This provides a clear error if the key
// is missing, which is a common source of problems.
if (!process.env.GOOGLE_API_KEY) {
  throw new Error(
    "CRITICAL: The GOOGLE_API_KEY environment variable is not set. For local development, add it to your .env file. For deployment, add it to your project's Environment Variables and redeploy."
  );
}

const plugins: GenkitPlugin[] = [];

// Always try to initialize the googleAI plugin.
// This ensures that Genkit is aware of it. We will handle errors
// in the actions if the key is missing or invalid.
plugins.push(googleAI());


export const ai = genkit({
  plugins: plugins,
  model: 'googleai/gemini-2.0-flash',
});
