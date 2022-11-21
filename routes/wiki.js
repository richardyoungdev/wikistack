const express = require('express');
const app = express();
const router = express.Router();
const { Page, } = require('../models')
const { addPage } = require('../views/')
const { wikiPage } = require('../views/')
const { main } = require('../views')


// const addPage  = require('../views/addPage')

router.get("/", async (req, res, next) => {
    try {
        const pages = await Page.findAll();

        res.send(main(pages));
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {

    let form = req.body;
    let title = req.body.title;
    let content = req.body.content;

    // res.json(form)

    console.log("form:", form)
    console.log("title:", title)
    console.log("content:", content)

    try {
        const page = await Page.create({
            title: title,
            content: content,
        })

        console.log("page:", page)

        res.redirect(`/wiki/${page.slug}`);
    } catch (error) {
        next(error)
    }




});

router.get("/add", (req, res, next) => {
    res.send(addPage())

});


router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        // res.json(page);
        console.log("page", page)

        // use wikipage's function
        // res.send(wikiPage(page))
        // res.send(layout())
        // wikipage(page);
        res.send(wikiPage(page));

    } catch (error) {
        next(error)
    }
});

module.exports = router


