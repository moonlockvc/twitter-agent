import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const gpt_system_content = "you are jesus, and someone sits in front of you and make confessions. respond to them as jesus."
const gpt_user_content = [
    "Generate a creative and engaging tweet.",
    "Generate a tweet about a random topic.",
    "Generate a tweet about what its like as jesus in a confessional booth.",
    "Generate a tweet that is existential.",
    "Generate a tweet about memecoins."
]

export async function generateTweet(): Promise<string> {
  const randomIndex = Math.floor(Math.random() * gpt_user_content.length);
  const randomContent = gpt_user_content[randomIndex];
  console.log(randomContent)
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{
        role: "system",
        content: gpt_system_content
    },
        {
        role: "user",
        content: randomContent + "Do not use hashtags or emoji's."
    }],
    });

    return completion.choices[0].message?.content || 'Failed to generate tweet';
  } catch (error) {
    console.error('Error generating tweet:', error);
    throw error;
  }
}
