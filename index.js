const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const interval = 100; // sec
const dailyInterval = 24 * 60 * 60; // 24 hours

async function makeApiCall(url, type) {
  const startTime = Date.now();
  const apiLogType = `[${type}]`;
  return new Promise((resolve) => {
    try {
      fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(`${apiLogType} API Result:`, data))
        .catch((err) => console.error(`${apiLogType} Fetch error:`, err))
        .finally(() => {
          console.log(
            `${apiLogType} Response Time:`,
            Date.now() - startTime,
            "ms"
          );
          resolve();
        });
    } catch (error) {
      console.error(`${apiLogType} Api error:`, error);
      resolve();
    }
  });
}

function startTracking() {
  console.log(
    `Executing tracking task in ${interval}s after previous response.`
  );

  makeApiCall("https://api.vdovareize.me/track", "Track").then(() => {
    setTimeout(startTracking, interval * 1000);
  });
}

function startDailyTask() {
  console.log(`Executing daily nudge task`);

  makeApiCall("https://api.vdovareize.me/cache/nudge", "Nudge").then(() => {
    setTimeout(startDailyTask, dailyInterval * 1000);
  });
}

startTracking();
startDailyTask();

app.get("/", (req, res) => {
  res.send("Server is running. Cron is active.");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
