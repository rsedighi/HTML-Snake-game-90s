const { getStore } = require("@netlify/blobs");

exports.handler = async (event) => {
  const store = getStore("high-scores");
  const scores = await store.get("scores") || [];
  const newScore = JSON.parse(event.body);
  
  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score);
  scores.splice(5); // Keep only top 5 scores
  
  await store.set("scores", scores);
  
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Score saved successfully" }),
  };
};