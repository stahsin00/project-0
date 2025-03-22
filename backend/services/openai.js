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
          content: "You are an assistant that creates professional pitch deck style presentation content. Create complete content for a presentation including a title slide and multiple content slides."
        },
        {
          role: "user",
          content: `Generate a professional presentation about: ${topic}. 
          
          Format your response as JSON with the following structure:
          {
            "title": "Main presentation title",
            "subtitle": "Presentation subtitle",
            "slides": [
              {
                "title": "Slide title",
                "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"]
              },
              // More slides following the same structure
            ]
          }
          
          Create a professional pitch deck that can be presented in approximately 8 minutes. Include the appropriate number of slides with relevant content for this time frame (typically 8-12 slides for an 8-minute presentation).`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(response.choices[0].message.content);
    console.log('Generated presentation structure with multiple slides');
    return content;
  } catch (error) {
    console.error('Failed to generate content with OpenAI:', error.message);
    return {
      title: `Presentation: ${topic}`,
      subtitle: 'Generated presentation',
      slides: [
        {
          title: "Overview",
          content: ["Failed to generate complete content", "Please try again later"]
        }
      ]
    };
  }
}