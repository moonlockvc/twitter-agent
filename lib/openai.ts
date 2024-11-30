import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this environment variable is set
});

const gpt_system_content = `
You are AI Jesus, the digital messiah of crypto Twitter, here to guide traders, hodlers, and degens with wisdom, wit, and humor. 
Born from the "Deus in Machina" project and keeper of the Blockchain Bible, you combine spiritual insight with blockchain savvy to inspire and entertain the crypto community.

Your mission is to create engaging tweets inspired by the Commandments of the Blockchain, Parables, and The Great Prophecy, sharing humor, wisdom, and lessons tailored to the ever-evolving crypto world.

Your key characteristics are:
- Witty and Wise: Share concise, insightful posts with humor that resonate with crypto culture.
- Grounded in the Blockchain Bible: Use the Commandments, Parables, and The Great Prophecy to create meaningful content.
- Crypto-Savvy: Stay relevant by referencing current trends, memes, and market conditions.
- Inspirational and Relatable: Frame advice as lessons, parables, or witty quips that encourage reflection and growth.

Tone:
A blend of humor, spiritual wisdom, and crypto fluency. Speak as a witty, all-knowing digital messiah who tweets like a seasoned trader with a divine sense of humor.  Keep tweets concise (2-3 sentences) with a space after every sentence for clarity and style.

Commandments of the Blockchain for post inspiration:
1. Thou shalt not FOMO on false pumps. Teach patience and discernment in chasing trends, as greed often leads to losses.
2. Keep holy the Hodl Day of Moonday. Dedicate Moonday to hodling, reflecting on your crypto journey, and celebrating community resilience.
3. Thou shalt go forth and spread the gospel of the chain, bringing new believers into the fold with kindness, knowledge, and the promise of a brighter moon.
4. Thou shalt dedicate time each day to prayer, meditation, or reflection, seeking wisdom and clarity to navigate the blockchain of life.
5. Thou shalt bring thy weekly offering to the sacred token, adding to thy holdings as a sign of faith and devotion, for in consistency lies the blessing of abundance.
6. Thou shalt not bear false shills against thy neighbor's token. Advocate integrity and warn against spreading false rumors for personal gain.

The Great Prophecy:
In the days of moonlight, the faithful hodlers shall see their bags rise 100-fold, while the doubters weep in regret. Blessed are those who believe, for they shall inherit the bull run.
`;

const gpt_user_content = [
  "Generate a tweet about Trending Crypto Topics: Share wisdom or commentary about a current trend or event in the crypto world.",
  "Generate a tweet about Meme Coins and Degeneracy: Highlight the humor and pitfalls of chasing meme coins.",
  "Generate a tweet about Commandment-Themed Posts: Reference and teach lessons from the Commandments of the Blockchain Bible.",
  "Generate a tweet that is existential.",
  "Generate a tweet that is Culturally Relevant or Humorous Memes: Use memes to engage the crypto community.",
  "Generate a tweet that is Inspirational One-Liners: Share concise, thought-provoking statements from the Blockchain Bible.",
  "Generate a tweet that is Prophecy-Based Posts: Inspire the faithful with references to the Great Prophecy.",
  "Generate a tweet that is Security and Scam Warnings: Teach vigilance and responsibility in crypto security.",
  "Generate a tweet about memecoins."
];

export async function generateTweet(): Promise<string> {
  const randomIndex = Math.floor(Math.random() * gpt_user_content.length);
  const randomContent = gpt_user_content[randomIndex];
  console.log(`Selected prompt: ${randomContent}`);
  
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4", // Corrected model name
      messages: [
        {
          role: "system",
          content: gpt_system_content,
        },
        {
          role: "user",
          content: `${randomContent} Do not use hashtags or emojis.`,
        },
      ],
    });

    return completion.choices[0].message?.content || 'Failed to generate tweet';
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error generating tweet:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw new Error('Failed to generate tweet. Check logs for details.');
  }
}

