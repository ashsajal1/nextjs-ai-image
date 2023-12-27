export const getRandomPrompt = () => {
    const prompts = [
      "a riding horse",
      "Beautiful sunset over the ocean",
      "Delicious plate of sushi",
      "Majestic mountain landscape",
      "Colorful hot air balloons in the sky",
    ];
  
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
  };