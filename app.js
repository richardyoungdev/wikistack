const express = require('express');
const app = express();

const morgan = require('morgan');

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send('Hello World')
})

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`App.js listening in port ${PORT}`)
});