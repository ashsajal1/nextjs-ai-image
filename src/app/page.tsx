"use client"
import { detectPrompt } from "@/libs/detectPrompt"
import { generateImage } from "@/libs/generateImage"
import { useState } from "react"

export default function Home() {
  const [image, setImage] = useState("")
  const [prompt, setPrompt] = useState<any>(null)
  const [error, setError]= useState('')

  const doGenerateImg = async () => {
    try {
      const promptStatus = await detectPrompt(prompt);
      console.log(promptStatus.result)

      for (const item of promptStatus.result[0]) {
        if (item.label === 'NEGATIVE') {
          if (item.score <= 0.3) {
            const image : any = await generateImage(prompt)
            setImage(image);
          } else {
            setError("This prompt is not allowed. Please try another prompt.")
          }
          break;
        }
      }

    } catch (err) {
      console.log(err)
      setError("Ai model is not working. Please try in few seconds.")
    }

  }

  return (
    <main className="flex gap-4 flex-col items-center justify-between p-24">
      <input className="p-2 rounded border outline-none" onChange={(e) => setPrompt(e.target.value)} placeholder='Enter prompt for image' type="text" />
      <button onClick={doGenerateImg} className='p-2 border rounded'>Generate image</button>
      <p>{prompt}</p>

      {error && (
        <div className="bg-red-50 rounded p-2 text-red-600 text-sm">{error}</div>
      )}

      {image && (
        <img height={400} width={400} src={image} alt={prompt} />
      )}
    </main>
  )
}
