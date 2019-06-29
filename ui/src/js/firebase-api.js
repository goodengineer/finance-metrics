const FirebaseApi = function(db) {
  if (!db) {
    FirebaseHelper.initialize()
    db = firebase.firestore()
  }

  const cache = {
    datapoints: {}
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

  const getDatapoints = (datasetId, since) => {
    if (!cache.datapoints[datasetId]) {
      console.log(`calculating ${datasetId} for the first time`);
      cache.datapoints[datasetId] = db.collection('datapoints')
      .where('datasetId', '==', datasetId)
      .where('date', '>=', moment().subtract(60, 'days').valueOf())
      .get()
      .then(FirebaseHelper.handleSnapshot)
    }

    return cache.datapoints[datasetId]
    .then(datapoints => datapoints.filter(dp => dp.date >= since))
  }

  return {
    getDashboards,
    getDashboard,
    getDataset,
    getDatapoints
  }
}
