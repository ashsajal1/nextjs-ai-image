import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { prompt } = await req.json();

  const response = await fetch(
    "https://api-inference.huggingface.co/models/distilbert-base-uncased-finetuned-sst-2-english",
    {
      headers: { Authorization: process.env.HUGGING_FACE_KEY as string },
      method: "POST",
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  const result = await response.json();
//   console.log(result)
  
  return NextResponse.json({ result });
};
