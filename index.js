const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const interval = 8; // sec

function startTracking() {
  try {
    console.log(`Executing task in ${interval}s after previous response.`);

    const startTime = Date.now();
    fetch("https://api.vdovareize.me/track")
      .then((res) => res.json())
      .then((data) => console.log("API Result:", data))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => {
        console.log("Response Time:", Date.now() - startTime, "ms");
        setTimeout(startTracking, interval * 1000);
      });
  } catch (err) {
    console.error("Tracking error:", err);
    setTimeout(startTracking, interval * 1000);
  }
}

startTracking();

app.get("/", (req, res) => {
  res.send("Server is running. Cron is active.");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
