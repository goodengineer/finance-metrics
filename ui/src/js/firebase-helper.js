const FirebaseHelper = (function() {

  function initialize() {
    if (isInitialized()) {
      // already initialized
      return
    }
    const firebaseConfig = {
      apiKey: "AIzaSyCBu0C3g5Ci9eC8TcOWb2x2tEUsmyzIvtI",
      authDomain: "finance-eye.firebaseapp.com",
      databaseURL: "https://finance-eye.firebaseio.com",
      projectId: "finance-eye",
      storageBucket: "finance-eye.appspot.com",
      messagingSenderId: "643926896295",
      appId: "1:643926896295:web:b8084e72abec1f5a"
    }
    firebase.initializeApp(firebaseConfig)

    console.log('firebase configured');
  }

  function isInitialized() {
    return firebase.apps.length
  }

  function handleSnapshot(snapshot) {
    const data = []
    snapshot.forEach(doc => {
      data.push({
        ...doc.data(),
        id : doc.id
      })
    })
    return data
  }

  function handleDoc(doc) {
    return { ...doc.data(), id: doc.id }
  }

  return {
    initialize,
    handleSnapshot,
    handleDoc
  }
})()
