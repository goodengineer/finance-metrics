const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { inject } = require('./src/inject')

admin.initializeApp()
const db = admin.firestore();

exports.injectPubSub = functions.pubsub.topic('inject-finance-metrics').onPublish(() => {
  return inject(db)
})

exports.inject = functions.https.onRequest((request, response) => {
  return inject(db)
  .then(_ => response.send("Finished metrics injection"))
});
