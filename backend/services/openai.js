import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSlideContent(topic) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: "You are an assistant that creates professional pitch deck style presentation content. Create a title and subtitle for the title presentation slide."
        },
        {
          role: "user",
          content: `Generate a professional title and subtitle for a presentation about: ${topic}. Format your response as JSON with 'title' and 'subtitle' fields.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(response.choices[0].message.content);
    console.log('Generated slide content:', content);
    return content;
  } catch (error) {
    console.error('Failed to generate content with OpenAI:', error.message);
    return {
      title: `Presentation: ${topic}`,
      subtitle: 'Generated presentation'
    };
  }
}