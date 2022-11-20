const express = require('express');
const app = express();
// const html = require("html-template-tag");
// const content = require('content')

const morgan = require('morgan');
const layout = require('./views/layout');

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send(layout(""))
})

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`App.js listening in port ${PORT}`)
});