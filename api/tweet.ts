import type { NextApiRequest, NextApiResponse } from 'next';
import { generateTweet } from '../lib/openai';
import { postTweet } from '../lib/twitter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if request is from Vercel Cron
  const isVercelCron = req.headers['x-vercel-cron'] === '1';
  
  // If not a Vercel Cron, verify API key
  if (!isVercelCron) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== process.env.API_SECRET_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  try {
    const tweet = await generateTweet();
    console.log("Mock for real post:", tweet)
    // await postTweet(tweet);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}