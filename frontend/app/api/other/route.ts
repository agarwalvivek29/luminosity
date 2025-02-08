import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { prompt } = body;

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const genAI = new GoogleGenerativeAI("AIzaSyCeVz3pzyYTXaGVjT6hWM_4K7fCadh2eNQ");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp" });

        const result = await model.generateContent(`Prompt:${prompt}`);
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
