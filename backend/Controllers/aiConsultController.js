import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const formatAIResponse = (text) => {
  // Add greeting
  let formatted = "**Health Assistant Response:**\n\n";
  
  // Format different sections
  const sections = text.split(/\n\s*\n/); // Split by double newlines
  
  sections.forEach(section => {
    if (section.toLowerCase().includes('recommendation') || 
        section.toLowerCase().includes('treatment') ||
        section.toLowerCase().includes('diagnosis')) {
      formatted += `\n**${section.split(':')[0].trim()}:**\n`;
      formatted += section.split(':').slice(1).join(':').trim() + '\n';
    } else if (section.includes('•') || section.includes('-')) {
      // Convert bullet points
      formatted += section.split(/[•-]/).map(point => 
        point.trim() ? `* ${point.trim()}\n` : ''
      ).join('');
    } else {
      formatted += section.trim() + '\n\n';
    }
  });

  return formatted.trim();
};

export const chatConsultation = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Initialize chat with safety settings
    const chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    });

    // Add previous messages to chat
    if (history.length > 0) {
      for (const msg of history) {
        try {
          await chat.sendMessage(msg.parts[0].text);
        } catch (err) {
          console.warn("Error adding history message:", err);
          // Continue even if one message fails
        }
      }
    }

    // Send the new message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Empty response from AI model");
    }
    
    const formattedResponse = formatAIResponse(text);
    
    res.status(200).json({
      reply: formattedResponse
    });
  } catch (error) {
    console.error("Chat Error details:", error);
    res.status(500).json({ 
      message: "Error processing your request",
      error: error.toString(),
      details: error.stack
    });
  }
};

export const analyzeReport = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const history = JSON.parse(req.body.history || '[]');
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Changed model name
    
    const imageFile = fs.readFileSync(req.file.path);
    const imageBase64 = imageFile.toString('base64');

    const contextPrompt = history.length > 0 
      ? "Based on our previous conversation and this medical report, provide a comprehensive analysis."
      : "Analyze this medical report and provide a detailed explanation of the findings, any concerning values, and recommendations.";

    const result = await model.generateContent([
      contextPrompt,
      {
        inlineData: {
          data: imageBase64,
          mimeType: req.file.mimetype
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    if (!text) {
      throw new Error("Empty response from AI model");
    }

    // Clean up uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      analysis: text
    });
  } catch (error) {
    console.error("Analysis Error details:", error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // Clean up file even if error occurs
    }
    res.status(500).json({ 
      message: "Error analyzing the report",
      error: error.toString()
    });
  }
};