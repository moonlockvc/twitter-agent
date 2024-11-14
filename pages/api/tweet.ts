import type { NextApiRequest, NextApiResponse } from 'next';
import { generateTweet } from '../../lib/openai';
import { postTweet } from '../../lib/twitter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify API key from request header
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== process.env.API_SECRET_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const tweet = await generateTweet();
    console.log("Mock for real post:", tweet)
    // await postTweet(tweet);
    return res.status(200).json({ success: true });
  } catch (error) {
    // Don't expose error details to client
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}