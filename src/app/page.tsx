"use client"
import Error from "@/components/Error"
import ImageLoader from "@/components/ImageLoader"
import Loader from "@/components/Loader"
import { detectPrompt } from "@/libs/detectPrompt"
import { generateImage } from "@/libs/generateImage"
import { getRandomPrompt } from "@/libs/randomPrompt"
import { useEffect, useState } from "react"

export default function Home() {
  const [image, setImage] = useState("")
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasPrompt, setHasPrompt] = useState(false)

  useEffect(() => {
    if(hasPrompt) {
      setHasPrompt(false)
      doGenerateImg()
    }
  }, [hasPrompt])

  const handleRandomImg = () => {
    const prompt = getRandomPrompt;
    setPrompt(prompt)
    setHasPrompt(true)
  }

  const doGenerateImg = async () => {
    try {
      setIsLoading(true)
      const promptStatus = await detectPrompt(prompt);
      // console.log(promptStatus.result)

      if(error) {
        setError('')
      }

      for (const item of promptStatus.result[0]) {
        if (item.label === 'NEGATIVE') {
          if (item.score <= 0.3) {
            const image: any = await generateImage(prompt)
            setImage(image);
          } else {
            setError("This prompt is not allowed. Please try another prompt.")
          }
          break;
        }
      }

      setIsLoading(false)

    } catch (err) {
      // console.log(err)
      setError("Ai model is not working. Please try in few seconds.")
      setIsLoading(false)
    }

  }

  return (
    <main className="flex gap-4 flex-col items-center justify-between p-24">

      {image ? (
        <>
        {isLoading ? (
          <ImageLoader isLoading={isLoading} />
        ) : (
          <img height={300} width={300} src={image} alt={prompt} />
        )}
        </>
      ) : (
        <ImageLoader isLoading={isLoading} />
      )}

      <input value={prompt} disabled={isLoading} className="p-2 rounded border outline-none" onChange={(e) => setPrompt(e.target.value)} placeholder='Enter prompt for image' type="text" />
      <div className="flex flex-col md:flex-row gap-2 p-2">
        <button disabled={isLoading} onClick={doGenerateImg} className='p-2 gap-2 flex items-center border rounded bg-gradient-to-br from-green-600 to-blue-600 text-slate-50 disabled:opacity-50'>
          <>
          {isLoading && (
            <Loader />
          )}
          </>
          <span>Generate image</span>
        </button>
        <button disabled={isLoading} onClick={handleRandomImg} className='p-2 border rounded disabled:opacity-50'>Random image</button>
      </div>

      {error && (
        <Error error={error} />
      )}

    </main>
  )
}
