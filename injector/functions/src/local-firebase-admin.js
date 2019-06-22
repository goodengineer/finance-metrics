
function initialize(admin) {
  const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://metrics-6affa.firebaseio.com"
  })
}

module.exports = {
  initialize
}
