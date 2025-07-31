import { config } from 'dotenv';
config();

import '@/ai/flows/generate-image.ts';
import '@/ai/flows/generate-text.ts';
import '@/ai/flows/generate-code.ts';
import '@/ai/flows/summarize-document.ts';
import '@/ai/flows/summarize-url.ts';
