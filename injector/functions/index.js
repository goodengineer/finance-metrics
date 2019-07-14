const admin = require('firebase-admin');
const { inject } = require('./src/inject')

admin.initializeApp()
const db = admin.firestore();

inject(db)
