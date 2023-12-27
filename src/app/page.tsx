"use client"
import Error from "@/components/Error"
import ImageLoader from "@/components/ImageLoader"
import Loader from "@/components/Loader"
import { detectPrompt } from "@/libs/detectPrompt"
import { generateImage } from "@/libs/generateImage"
import { getRandomPrompt } from "@/libs/randomPrompt"
import { LinkBreak1Icon, LinkBreak2Icon, MagicWandIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

export default function Home() {
  const [image, setImage] = useState("")
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasPrompt, setHasPrompt] = useState(false)

  useEffect(() => {
    if (hasPrompt) {
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

      if (error) {
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

      {error && (
        <Error error={error} />
      )}

      <div className="w-full md:w-[500px]">
        <input value={prompt} disabled={isLoading} className="p-2 rounded border outline-none w-full text-gray-600" onChange={(e) => setPrompt(e.target.value)} placeholder='Enter prompt for image' type="text" />

        <div className="flex flex-col md:flex-row gap-2 mt-2 w-full">
          <button disabled={isLoading} onClick={doGenerateImg} className='p-2 flex gap-2 items-center border rounded bg-gradient-to-br from-green-600 to-blue-600 text-slate-50 disabled:opacity-50 w-full justify-center h-[45px]'>
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <LinkBreak2Icon />
              )}
            </>

            <span>Generate image</span>
          </button>

          <button disabled={isLoading} onClick={handleRandomImg} className='p-[1px] flex gap-2 items-center border rounded disabled:opacity-50 h-[45px] bg-gradient-to-br from-green-600 to-blue-600 w-full'>
            <div className="bg-slate-50 w-full h-full flex items-center rounded justify-center">
              <div className="flex items-center justify-center p-1 gap-2 bg-gradient-to-br from-green-600 to-blue-600 text-transparent bg-clip-text">
                <MagicWandIcon className="text-green-600" />
                <span>Random image</span>
              </div>
            </div>
          </button>
        </div>


      </div>

    </main>
  )
}
