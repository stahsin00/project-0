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
          content: `You are an assistant that creates professional pitch deck style presentation content. Create complete content for a presentation including a title slide and multiple content slides.
          
          Incorporate elements of this pitch framework naturally without making it feel formulaic:
          - Introduction: audience assessment, relevance, impact, key takeaway
          - Body: problem/solution, product details, benefits, market position, before/after comparison
          - Conclusion: reinforced takeaway, next steps, contact details
          
          BUT maintain variety in slide structure, order, and design. Don't make slides feel templated or repetitive.
          Use different slide layouts throughout the presentation to maintain visual interest.`
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
                "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
                "layout": "TITLE_ONLY|TITLE_AND_BODY|TITLE_AND_TWO_COLUMNS|SECTION_HEADER|BLANK"
              }
            ]
          }
          
          Create 8-12 slides for an 8-minute presentation. Be creative with:
          - Varied slide layouts (don't use the same layout for consecutive slides)
          - Different numbers of bullet points based on content importance
          - Creative slide titles that engage the audience
          - Occasional quote slides or visual instruction slides
          
          For variety, you can also include:
          - Data visualization suggestions (describe what chart would work)
          - Slides with just a powerful statement or question
          - Comparison slide layouts
          
          Make sure content flows naturally while incorporating pitch framework elements.`
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
          content: ["Failed to generate complete content", "Please try again later"],
          layout: "TITLE_AND_BODY"
        }
      ]
    };
  }
}