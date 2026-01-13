
import { GoogleGenAI } from "@google/genai";

export const generateWallpaperImage = async (prompt: string): Promise<string> => {
  // Fixed: Create a new GoogleGenAI instance right before making the request as per guidelines.
  // Using process.env.API_KEY directly without fallback.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "9:16"
      }
    }
  });

  // Fixed: Iterate through response parts to find the inlineData image part, as recommended.
  const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  if (part?.inlineData) {
    return `data:image/png;base64,${part.inlineData.data}`;
  }
  
  throw new Error("Failed to generate image from Gemini API.");
};

export const generateWallpaperVideo = async (
  base64Image: string, 
  prompt: string
): Promise<string> => {
  // Fixed: Create a new GoogleGenAI instance right before the video generation request.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Strip the prefix 'data:image/png;base64,'
  const imageData = base64Image.split(',')[1];

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    image: {
      imageBytes: imageData,
      mimeType: 'image/png'
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '9:16'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) {
    throw new Error("Video generation completed but no link was provided.");
  }

  // Fixed: Append the API key to the download URL when fetching the generated video.
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};