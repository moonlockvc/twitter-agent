import { postTweet } from './lib/twitter';

(async () => {
  try {
    await postTweet("Mind is power.");
    console.log('Tweet posted successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to post tweet:', error);
    process.exit(1);
  }
})();