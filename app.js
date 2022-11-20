const express = require('express');
const app = express();
const { db } = require('./models')

const morgan = require('morgan');
const layout = require('./views/layout');

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send(layout())
})

db.authenticate() 
  .then(() => { 
    console.log('connected to the database'); 
})

const init = async () => {
   
    await db.sync({force: true})

    const PORT = 3000;
    app.listen(PORT, ()=> {
        console.log(`App.js listening in port ${PORT}`)
    });
}

init();