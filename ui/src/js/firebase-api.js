const FirebaseApi = function(db) {
  if (!db) {
    FirebaseHelper.initialize()
    db = firebase.firestore()
  }

  const getDashboards = () => (
    db.collection('dashboards').get()
    .then(FirebaseHelper.handleSnapshot)
  )

  const getDashboard = id => (
    db.collection('dashboards').doc(id).get()
    .then(FirebaseHelper.handleDoc)
  )

  const getDataset = id => (
    db.collection('datasets').doc(id).get()
    .then(FirebaseHelper.handleDoc)
  )

  const getDatapoints = datasetId => (
    db.collection('datapoints').where('datasetId', '==', datasetId).get()
    .then(FirebaseHelper.handleSnapshot)
  )

  return {
    getDashboards,
    getDashboard,
    getDataset,
    getDatapoints
  }
}
