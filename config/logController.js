const firebase = require('firebase');
const admin = require('firebase-admin');

module.exports.login = (req, res) => {
    const { email, password } = req.body;

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(() => {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((userCredential) => {
                    // Sign-in successful.
                    const user = userCredential.user;
                    req.session.currentUser = {
                        uid: user.uid,
                        email_verified: user.emailVerified,
                        name: user.displayName,
                        email: user.email
                    };
                    const redirectUrl = req.session.returnTo || `/profile/${user.uid}`
                    delete req.session.returnTo;
                    firebase.auth().signOut();
                    res.redirect(redirectUrl)

                })
                .catch((error) => {
                    // An error happened.
                    req.flash('error', error.message);
                    res.redirect('/login')
                });
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            res.send(error);
        });
}