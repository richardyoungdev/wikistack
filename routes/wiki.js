const express = require('express');
const app = express()
const router = express.Router();
const { Page, User, } = require('../models')
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

    // let form = req.body;
    // let title = req.body.title;
    // let content = req.body.content;

    // // res.json(form)

    // console.log("form:", form)
    // console.log("title:", title)
    // console.log("content:", content)

    try {
        const [user, wasCreated] = await User.findOrCreate({
            where: {
                name: req.body.name,
                email: req.body.email
            }
        })

        const page = await Page.create(req.body)

        console.log("page:", page)

        // `setAuthor` returns a Promise! We should await it so we don't redirect before the author is set
        await page.setAuthor(user);

        res.redirect(`/wiki/${page.slug}`);
    } catch (error) {
        next(error)
    }




});

router.get("/add", async (req, res, next) => {
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

        const author = await page.getAuthor()
        console.log("author ---->", author)

        // use wikipage's function
        // res.send(wikiPage(page))
        // res.send(layout())
        // wikipage(page);
        res.send(wikiPage(page, author));

    } catch (error) {
        next(error)
    }
});


// put at end of pipeline for customized error
// when ever a catch catches an error, it ends up here below:
// Error handling middleware is 4 parameters
// router.use((error, req, res, next) => {
//     console.log("hi")
//     console.log(error) // tracking error
//     res.status(500);
//     res.send(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta http-equiv="X-UA-Compatible" content="IE=edge">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Oops</title>
//         </head>
//         <body>
//             <h1>Oop! :(</h1>
//             <img src="404img.jpeg" alt="" srcset="">
//         </body>
//         </html>
//     `)
// });

module.exports = router


