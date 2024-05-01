const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }))



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cookieSession({
    name:'session',
    keys: ['key1','key2'],
    maxAge: 3600 * 1000 * 24
}))

const login = require("./routes/login");
app.use("/", login);

const db = require("./routes/db");
app.use("/", db);

// const datadb = require('./routes/model/datadb');
// app.use("/", datadb);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});