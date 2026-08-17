import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/utils';

const AI_TRAINING_BOTS = [
  'GPTBot',
  'Google-Extended',
  'CCBot',
  'anthropic-ai',
  'ClaudeBot',
  'Amazonbot',
  'meta-externalagent',
];

const AI_RETRIEVAL_BOTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...[...AI_TRAINING_BOTS, ...AI_RETRIEVAL_BOTS].map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
