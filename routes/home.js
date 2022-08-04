const express = require('express');
const router = express.Router();
/* const { Router } = require('express');

const router = Router(); */


router.get('/index/proyectos', async(req, res) => {
    res.render('proyectos')
});

/* router.post('/index/proyectos', async(req, res) => {

    console.log('index,proyectos')
}) */

router.get('/index/equipo', async(req, res) => {
    res.render('equipo')
});

/* router.post('/index/equipo', async(req, res) => {

    console.log('index,equipo')
}) */

router.get('/index/AI', async(req, res) => {
    res.render('AI')
});

/* router.post('/index/AI', async(req, res) => {

    console.log('index,AI')
})
 */

//------------ Database --------------//
router.get('/index/database', async(req, res) => {
        res.render('database')
    })
    /* router.post('/index/database', async(req, res) => {

        console.log('index,DB')
    }) */

module.exports = router;