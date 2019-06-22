const App = (function() {

  function start() {
    console.log('application is running');

    // FirebaseInit.initialize()

    // const db = firebase.firestore()

    // db.collection('datapoints').get()
    // .then(handleSnapshot)
    // .then(data => data.map(x => x.data))
    // .then(datapoints => datapoints.map(handleDatapoint))
    // .then(console.log)
  }

  function handleDatapoint(datapoint) {
    datapoint.x = datapoint.x.toDate().getTime()
    return datapoint
  }

  function handleSnapshot(snapshot) {
    const data = []
    snapshot.forEach(doc => {
      data.push({
        id: doc.id,
        data: doc.data()
      })
    })
    return data
  }

  return {
    start
  }
})()

window.addEventListener('load', App.start)
