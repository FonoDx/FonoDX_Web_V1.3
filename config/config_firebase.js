const admin = require('firebase-admin')
const firebase = require('firebase');
const serviceAccount = require('../firebase-key.json')
const config = require("../config/firebaseConfig.js")
const fbfunctions = require('firebase-functions')


firebase.initializeApp(config.firebaseConfig);

//const usuario = firebase.auth().currentUser; *ojo

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fono-dx-dc611-default-rtdb.firebaseio.com/"
});


const dbf = admin.firestore()
const db = admin.database()


function createAccount() {
    // obtain user email and user password from HTML
    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch((error) => {
        //error code
        var errorCode = error.code

        //error message
        var errorMessage = error.message
    }).then(() => {
        //redirect the user to profile page
        window.location.assign("/registro");
    });
}


function signInUsers2() {

    //const token = await firebase.auth().currentUser.getIdToken();
    admin.auth().currentUser.getIdToken( /* forceRefresh */ true).then(function(idToken) {
        // Send token to your backend via HTTPS
        // ...
    }).catch(function(error) {
        // Handle error
    });

    // idToken comes from the client app
    admin.getAuth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            // ...
        })
        .catch((error) => {
            // Handle error
        });


    /* 
    // As httpOnly cookies are to be used, do not persist any state client side.
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    // When the user signs in with email and password.
    firebase.auth().signInWithEmailAndPassword('user@example.com', 'password').then(user => {
    // Get the user's ID token as it is needed to exchange for a session cookie.
    return user.getIdToken().then(idToken = > {
        // Session login endpoint is queried and the session cookie is set.
        // CSRF protection should be taken into account.
        // ...
        const csrfToken = getCookie('csrfToken')
        return postIdTokenToSessionLogin('/sessionLogin', idToken, csrfToken);
    });
    }).then(() => {
    // A page redirect would suffice as the persistence is set to NONE.
    return firebase.auth().signOut();
    }).then(() => {
    window.location.assign('/profile');
     */
}


function signOut() {

    firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
    //checkIfLoggedIn()
}

function checkIfLoggedIn() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) { // if the user is logged in            
            //var emailVerified = user.emailVerified;
            var emailv = user.email;
            console.log("User is signed in. with email: " + emailv);
            //window.location.href = 'index.ejs';
            res.redirect('index');
        } else { // if the user is not logged in
            console.log("No user is signed in.");
            //window.location.href = '/';            
        }
    });
}

//https://github.com/firebase/quickstart-nodejs/blob/master/auth-sessions/app.js
function checkIfSignedIn(url) {
    return function(req, res, next) {
        if (req.url == url) {
            const sessionCookie = req.cookies.session || '';
            // User already logged in. Redirect to profile page.
            admin.auth().verifySessionCookie(sessionCookie).then(function(decodedClaims) {
                res.redirect('/profile');
            }).catch(function(error) {
                next();
            });
        } else {
            next();
        }
    }
}

/* 
window.onload=function(){
    checkIfLoggedIn()
}
 */

// send verification email
function sendVerificationEmail() {
    // extracting the user from the firebase
    var user = firebase.auth().currentUser;

    user.sendEmailVerification().then(function() {
        window.alert("Verification link sent to your email. Kinldy check to verify your account")
    }).catch(function(error) {
        // An error happened.
    });
}

module.exports = {
    firebase: firebase,
    admin: admin,
    dbf: dbf,
    db: db,
    signOut: signOut,
    checkIfLogedIn: checkIfLoggedIn
}