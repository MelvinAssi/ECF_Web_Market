const admin = require("firebase-admin");
const fs = require("fs");


const secretFilePath = "/etc/secrets/serviceAccountKey.json";
let serviceAccount;

if (fs.existsSync(secretFilePath)) {
  serviceAccount = require(secretFilePath);
} else {
  serviceAccount = require("./serviceAccountKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin.firestore();
