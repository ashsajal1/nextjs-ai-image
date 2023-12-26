"use client"
import { useState } from "react"

export default function Home() {
  const [image, setImage] = useState("")
  const [prompt, setPrompt] = useState<any>(null)

  const doGenerateImg = async () => {
    const response = await fetch("/api", {
      method: "POST",
      cache: "no-store",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt
      })
    })

    const data = await response.json();
    setImage(`data:image/jpeg;base64,${data.base64}`);
    // console.log(data)
    // console.log(data.url);
    // setImage(data.url);
  }

  return (
    <main className="flex gap-4 flex-col items-center justify-between p-24">
      <input className="p-2 rounded border outline-none" onChange={(e) => setPrompt(e.target.value)} placeholder='Enter prompt for image' type="text" />
      <button onClick={doGenerateImg} className='p-2 border rounded'>Generate image</button>
      <p>{prompt}</p>

      {image && (
        <img height={400} width={400} src={image} alt={prompt} />
      )}
    </main>
  )
}
