const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// --- YOUR CRON LOGIC STARTS HERE ---

// This runs every 10 seconds (10000 milliseconds)
setInterval(() => {
    // REPLACE THIS with your actual task
    console.log(`[${new Date().toISOString()}] Executing 10-second task...`);

    // Example: 
    // fetch('https://api.example.com/update-data');

}, 10000);

// --- YOUR CRON LOGIC ENDS HERE ---

// Keep-alive endpoint
app.get('/', (req, res) => {
    res.send('Server is running. Cron is active.');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});