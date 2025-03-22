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
          content: `You are an expert presentation designer who creates professional, visually engaging pitch deck content.
          
          You excel at:
          1. Creating compelling headlines that capture attention
          2. Writing concise bullet points that convey key information
          3. Structuring presentations with logical flow
          4. Incorporating memorable quotes or statistics
          5. Adapting content style to match the presentation topic
          
          For technical or business presentations, use precise language and data-driven points.
          For creative or marketing presentations, use more evocative language and emotional appeals.`
        },
        {
          role: "user",
          content: `Generate a professional presentation about: ${topic}. 
          
          Format your response as JSON with the following structure:
          {
            "title": "Main presentation title - make it catchy and relevant",
            "subtitle": "Presentation subtitle - add context or explain the value proposition",
            "theme": "Suggested visual theme (tech, business, creative, health, etc.)",
            "slides": [
              {
                "title": "Slide title - clear and concise",
                "content": ["Bullet point 1", "Bullet point 2", "Bullet point 3"],
                "notes": "Optional presenter notes with key talking points"
              },
              // More slides following the same structure
            ]
          }
          
          Create a professional pitch deck that follows this structure:
          
          1. Title slide (generated automatically)
          2. Problem/Opportunity - What problem does this solve? What opportunity exists?
          3. Solution Overview - How does your idea solve this problem?
          4. Features/Benefits - What are the key features and their benefits?
          5. Market Analysis - Who is this for? How big is the opportunity?
          6. Business Model - How will this make money?
          7. Competition - How does this compare to alternatives?
          8. Roadmap - What are the next steps?
          9. Team/Resources - What's needed to make this successful?
          10. Call to Action - What should the audience do next?
          
          Be concise - limit bullets to 3-5 per slide, with each bullet being 1-2 lines max.
          Include at least one memorable quote, statistic or key takeaway that could be highlighted.
          Make the content feel cohesive and well-structured.`
        }
      ],
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(response.choices[0].message.content);
    console.log('Generated presentation structure with multiple slides');
    
    if (!content.theme) content.theme = "business";
    if (!content.slides || !Array.isArray(content.slides)) {
      content.slides = [
        {
          title: "Overview",
          content: ["Key aspects of this presentation", "Main benefits and features", "Next steps and call to action"]
        }
      ];
    }
    
    content.slides = content.slides.map(slide => {
      if (!slide.content || !Array.isArray(slide.content) || slide.content.length === 0) {
        slide.content = ["Point 1", "Point 2", "Point 3"];
      }
      return slide;
    });
    
    return content;
  } catch (error) {
    console.error('Failed to generate content with OpenAI:', error.message);
    return {
      title: `Presentation: ${topic}`,
      subtitle: 'Generated presentation',
      theme: "business",
      slides: [
        {
          title: "Overview",
          content: ["Failed to generate complete content", "Please try again later"]
        }
      ]
    };
  }
}