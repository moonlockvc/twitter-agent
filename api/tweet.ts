import type { NextApiRequest, NextApiResponse } from 'next';
import { generateTweet } from '../lib/openai';
import { postTweet } from '../lib/twitter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }
  
  try {
    const tweet = await generateTweet();
    console.log("Mock for real post:", tweet)
    await postTweet(tweet);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
