const { getStore } = require("@netlify/blobs");

exports.handler = async () => {
  const store = getStore("high-scores");
  const scores = await store.get("scores") || [];
  
  return {
    statusCode: 200,
    body: JSON.stringify(scores),
  };
};