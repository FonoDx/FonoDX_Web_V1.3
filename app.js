//import express from 'express'
const { query } = require('express');
const express = require('express');
//const logger = require('morgan');
//const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser') *needs install
const path = require('path')
const routes = require('./routes/home')
    //const firebase = require('firebase');
    //*const config = require("../config/firebaseConfig.js")
const fbfunctions = require('firebase-functions');
const { firebase, admin, dbf, db, signOut, checkIfLoggedIn } = require('./config/config_firebase.js');


const app = express();

//const PORT = process.env.PORT || 7000;
/* 
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
*/

app.listen('7000', (req, res) => {
    console.log('Up & Running *7000 on url http://localhost')
})

//app.listen(config.port, () => console.log("Up & Running *7000 on url http://localhost" + config.port));

//--------Folders-------------//
app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, './public')))
app.use(express.static(path.join(__dirname, './styles')))
    //app.use(express.static('./styles'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))



//app.set('views',__dirname+'/views/')
//app.use(logger('dev'))
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended:false }))
app.use(routes)


//create authentication middle ware
function checkLoggedIn(request, resposense, next) { // if user is authenticated in the session, carry on
    if (request.isAuthenticated())
        return next(); // if they aren't redirect them to the index page
    resposense.redirect('/');
}

//---------Routes-------------//
app.get('/', async(req, res) => {
    //
    const querySnapshot = await dbf.collection('Usuarios').get()
    const usuarios = querySnapshot.docs.map(usuario => ({
        id: usuario.id,
        datos: usuario.data(),
        ...usuario.data()
    }))

    res.render('login')
        //checkIfLoggedIn();
})

//------------ Request to Auth with FB --------------//

app.post('/', async(req, res, next) => {

    const { Email, Password } = req.body;
    try {
        firebase.auth()
            .signInWithEmailAndPassword(Email, Password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user.uid;
                /* var IdToken = userCredential.currentUser.getIdToken().then(function(data) {
                    console.log(data)
                }); */
                //var uID = userCredential.uid;
                console.log(user)
                res.redirect('index');
                //checkIfLoggedIn();
            })
            //checkIfLoggedIn()        
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                //res.render('login', { errorM: errorMesagge })
                res.redirect('/')
            });
    } catch (e) {
        res.redirect(200, 'login')
    }

    //SESSION COOKIE CREATION
    /* 
    // Get the ID token passed and the CSRF token.    
    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    //SENSIBLE DATA    
    //COOKIE SESSION AND permissions isgnVERIFICATION 
    */
})

//------------ Request to register user with FB --------------//
app.get('/registro', async(req, res) => {
    res.render('registro')
})

app.post('/registro', async(req, res) => {

    const { Cargo, Celular, Documento, Email, Fecha, Instituto, Nombre, Pais, Password } = req.body

    console.log(Cargo, Celular, Documento, Email, Fecha, Instituto, Nombre, Pais, Password)
        //res.redirect(200, '/')
    await dbf.collection('Usuarios').add({
            Cargo,
            Celular,
            Documento,
            Email,
            Fecha,
            Instituto,
            Nombre,
            Pais,
            Password
        })
        /* 
        await admin.auth().createUser({email: newUser.email, password: newUser.password})
            .then(data =>{
                console.log(admin.auth().currentUser.getIdToken());
                return res.status(201).json({message: `user ${data.uid} signed up successfully`});

            })
            .catch(err =>{
                console.error(err);
                return res.status(500).json({error: err.code});
            });
        */
    res.redirect(200, '/')
})

//------------ Index --------------//


app.get('/index', async(req, res) => {
    const querySnapshot = await dbf.collection('Usuarios').get()
    const usuarios = querySnapshot.docs.map(usuario => ({
        id: usuario.id,
        datos: usuario.data(),
        ...usuario.data()
        //email: doc.data().Email,
        //nombre: doc.data().Nombre
    }))
    res.render('index2', { usuarios })
})

app.get('/index/database2', async(req, res) => {
    res.render('database')
})