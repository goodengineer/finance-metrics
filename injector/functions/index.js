const admin = require('firebase-admin');
const { inject } = require('./src/inject')

require('./src/local-firebase-admin').initialize(admin)
const db = admin.firestore()

inject(db)
