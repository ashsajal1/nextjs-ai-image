export const generateImage = async (prompt:string) => {
    const response = await fetch("/api", {
   method: "POST",
   cache: "no-store",
   headers: { 'Content-Type': 'application/json'},
   body: JSON.stringify({
     prompt
   })
 })

 const data = await response.json();
 return `data:image/jpeg;base64,${data.base64}`
}