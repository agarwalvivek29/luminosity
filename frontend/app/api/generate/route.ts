import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { prompt } = body;

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(`
          You are a content classifier. For the given user's prompt, determine which one of these five categories it falls into: Maths, Physics, Chemistry, Computer Science or Electronics. Return only the name of the matching category without any additional text or explanation.
          Prompt:${prompt}`);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ 
            error: "Failed to generate content", 
            details: error instanceof Error ? error.message : "Unknown error" 
        }, { status: 500 });
    }
}
