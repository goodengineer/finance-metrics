const FirebaseInit = (function() {

  function initialize() {
    const firebaseConfig = {
      apiKey: "AIzaSyBixHqFp06bXD-gWu2D8L-46T2cNVvtqYY",
      authDomain: "metrics-6affa.firebaseapp.com",
      databaseURL: "https://metrics-6affa.firebaseio.com",
      projectId: "metrics-6affa",
      storageBucket: "metrics-6affa.appspot.com",
      messagingSenderId: "80746674498",
      appId: "1:80746674498:web:7248ed4f2160adcf"
    }
    firebase.initializeApp(firebaseConfig)

    console.log('firebase configured');
  }

  return {
    initialize
  }
})()
