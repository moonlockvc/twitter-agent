import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config';

export const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
});

export async function postTweet(tweet: string): Promise<void> {
    console.log(process.env.TWITTER_API_KEY)
    try {
      await twitterClient.v2.tweet(tweet);
      console.log('Successfully posted tweet:', tweet);
    } catch (error) {
      console.error('Error posting tweet:', error);
      throw error;
    }
  }