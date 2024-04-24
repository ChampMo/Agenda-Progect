const express = require('express');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/testapi', (req, res) => {
    res.send('Hello World11');
});

const db = require("./routes/db");
app.use("/", db);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});