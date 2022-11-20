const express = require('express');
const app = express();
const router = express.Router();
const {Page} = require('../models')
const {addPage}  = require('../views/')
// const addPage  = require('../views/addPage')

router.get("/", (req, res, next) => {
    res.send('got to GET /wiki/')
});

router.post("/", async (req, res, next) => {
  
    let form = req.body;
    let title = req.body.title;
    let content = req.body.content;

    console.log("form:", form)
    console.log("title:", title)
    console.log("content:", content)
    res.json(form)

    try {
        const page = await Page.create({
            title: title,
            content: content
        })
        res.redirect('/')
    }

    catch (error) {
        next(error)
    }
});

router.get("/add", (req, res, next) => {
    res.send(addPage())
});

module.exports = router 