const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const interval = 30000;
setInterval(() => {
    console.log(`[${new Date().toISOString()}] Executing second task with ${interval / 1000} interval...`);

    // Example: 
    fetch('https://api.vdovareize.me/track')
        .then(res => res.json())
        .then(data => console.log('API Result:', data))
        .catch(err => console.error('Fetch error:', err));

}, interval);
app.get('/', (req, res) => {
    res.send('Server is running. Cron is active.');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});