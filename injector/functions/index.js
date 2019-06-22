const admin = require('firebase-admin');
const functions = require('firebase-functions');
const { inject } = require('./src/inject')

admin.initializeApp()
const db = admin.firestore();

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: '1GB'
}

exports.injectPubSub = functions.runWith(runtimeOpts).pubsub.topic('inject-finance-metrics').onPublish(() => {
  return inject(db)
})

exports.inject = functions.runWith(runtimeOpts).https.onRequest((request, response) => {
  return inject(db)
  .then(_ => response.send("Finished metrics injection"))
});
