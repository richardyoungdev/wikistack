const express = require('express');
const app = express();
const { db } = require('./models')

const morgan = require('morgan');
const layout = require('./views/layout');

const wikiRouter = require('./routes/wiki')
const usersRouter = require('./routes/users')

db.authenticate() 
  .then(() => { 
    console.log('connected to the database'); 
})

app.use(morgan("dev"));

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}))
app.use('/wiki', wikiRouter)
app.use('/users', usersRouter)


app.get('/', (req, res) => {
    res.redirect('/wiki')
})

// put at end of pipeline for customized error
// when ever a catch catches an error, it ends up here below:
app.use((error, req, res, next) => {
    console.log("hi")
    res.send("lol")
});



const init = async () => {
   
    await db.sync({force: false})

    const PORT = 3000;
    app.listen(PORT, ()=> {
        console.log(`App.js listening in port ${PORT}`)
    });
}

init();