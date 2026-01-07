const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const interval = 25; // sec
setInterval(() => {
  console.log(`Executing task with ${interval}s interval`);

  const startTime = Date.now();
  fetch("https://api.vdovareize.me/track")
    .then((res) => res.json())
    .then((data) => console.log("API Result:", data))
    .catch((err) => console.error("Fetch error:", err))
    .finally(() => console.log("Response Time:", Date.now() - startTime, "ms"));
}, interval * 1000);
app.get("/", (req, res) => {
  res.send("Server is running. Cron is active.");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
