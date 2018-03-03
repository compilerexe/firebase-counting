const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.addCounting = functions
  .https
  .onRequest((request, response) = > {
  return admin
    .database()
    .ref()
    .child('count')
    .once('value', (snapshot) = > {
    return admin
      .database()
      .ref('/')
      .set({
        count: parseInt(snapshot.val()) + 1
      })
      .then(() = > {
      return response.send('add counting success.')
})

})

})


exports.writeCounting = functions.https.onRequest((request, response) = > {
  return admin
    .database()
    .ref('/')
    .set({count: request.body.count})
    .then(() = > {
    return response.send('update counting success.')
})

})


exports.readCounting = functions.https.onRequest((request, response) = > {
  return admin
    .database()
    .ref('/')
    .on('value', (snapshot) = > {
    return response.send(snapshot.val())
})

})
