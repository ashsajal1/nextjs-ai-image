import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const {prompt} = await req.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1",
    {
      headers: { Authorization: process.env.HUGGING_FACE_KEY as string },
      method: "POST",
      body: JSON.stringify({"inputs": prompt}),
    }
  );
  const result = await response.blob();
 
  return NextResponse.json({
    result
  })
};
