export const detectPrompt = async (prompt: string) => {
  const response = await fetch("/api/detect", {
    method: "POST",
    // cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt,
    }),
  });

  const data = await response.json();
  // console.log(data)
  return data;
};
