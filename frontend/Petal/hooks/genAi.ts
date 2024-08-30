import { GoogleGenerativeAI } from "@google/generative-ai";
import {GoogleAIFileManager} from "@google/generative-ai/server"
import fs from "fs";
// const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_API_KEY!);
const fileManager = new GoogleAIFileManager(process.env.EXPO_PUBLIC_API_KEY!);
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_API_KEY!);



export async function getAIResponse(uriPath : string) {
   
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "Write a story about a magic backpack.";
    const uploadResponse = await fileManager.uploadFile(uriPath, {
        mimeType: "image/png"
        // displayName: "Jetpack drawing",
      });

    console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
    const result = await model.generateContent(prompt);
    return result
}