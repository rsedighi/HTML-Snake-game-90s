import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const store = getStore("highScores");
    const scores = JSON.parse(await store.get("scores") || "[]");
    const newScore = await req.json();
    
    scores.push(newScore);
    scores.sort((a, b) => b.score - a.score);
    scores.splice(5); // Keep only top 5 scores
    
    await store.set("scores", JSON.stringify(scores));
    
    return new Response(JSON.stringify({ message: "Score saved successfully" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error('Error saving high score:', error);
    return new Response(JSON.stringify({ error: 'Failed to save high score', details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
};

export const config = {
  path: "/saveHighscore"
};