import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  try {
    const store = getStore("highScores");
    const scores = JSON.parse(await store.get("scores") || "[]");
    
    return new Response(JSON.stringify(scores), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    console.error('Error getting high scores:', error);
    return new Response(JSON.stringify({ error: 'Failed to get high scores', details: error.message }), {
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
  path: "/getHighscore"
};