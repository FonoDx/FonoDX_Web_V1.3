//const admin = require('firebase-admin');
const firebase = require('firebase');
const { firebaseConfig } = require('./firebaseConfig.js');
const { admin, dbf, db } = require('./config_firebase.js');



firebase.initializeApp(firebaseConfig);

const firebaseAuth = async(req, res) => {
    try {
        // req.body the payload coming from the client to authenticate the user
        // uid is the firebase uid generated when a user is authenticated on the firebase client
        const userRequest = await firebase.database().ref(`users/${req.body.uid}`).once('value');
        const userPayload = userRequest.val();

        if (userPayload) {
            // create tokenClaims if you wish to add extra data to the generated user token
            const tokenClaims = {
                roleId: userPayload.roleId
            }

            // use firebase admin auth to set token claimsm which will be decoded for additional authentication
            await firebase.auth().setCustomUserClaims(user.uid, tokenClaims);

            return res.status(200).json({ data: tokenClaims });
        } else {
            return res.status(404).json({ error: { message: 'No user found' } });
        }
    } catch (error) {
        return res.status(500).json({
            error: { message: 'could not complete auth request' }
        });
    }
}




/* 
window.onload = function() {
    checkIfLogedIn()
}
 */

function logout() {
    firebase.auth().signOut();
    checkIfLogedIn()
}

export default {
    firebaseAuth
}