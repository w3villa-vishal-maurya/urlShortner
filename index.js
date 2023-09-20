const express = require('express');
const urlRoute = require('./router/url');
const { connectToDb } = require('./config/connection');
const hbs = require("hbs");
const bodyParser = require('body-parser');
const { handleURLShortner, getRedirectUrl, visitClickedHistory } = require('./controller/url')



const app = express();
const PORT = process.env.PORT || 8000;

const url = ('mongodb://127.0.0.1:27017/shortdb');

connectToDb(url);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("index");
})

app.post('/', handleURLShortner);

app.get('/:shortId', getRedirectUrl)

app.get('/analytics/:shortId', visitClickedHistory)

app.use("/url", urlRoute);

app.listen(PORT, () => {
    console.log(`You are litening the port ${PORT}`);
})