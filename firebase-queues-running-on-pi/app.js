var Queue = require('firebase-queue');
var admin = require("firebase-admin");
var path = require('path');
var fs = require('fs');
var Gpio = require('onoff').Gpio;
var led = new Gpio(4, 'out');


// https://firebase.google.com/docs/admin/setup
// Use google cloud console to generate a serviceAccountKey.
admin.initializeApp({
 credential: admin.credential.cert('serviceAccountKey.json'),
 databaseURL: 'https://leblanc-xyz.firebaseio.com',  // Use firebase console to get your databaseURL.
 databaseAuthVariableOverride: {
  uid: "toggle-worker"  // You are going want to setup rtdb rules for production, change rules to read/write true for demo.
 }
});

// TODO(lmeneses): debounce here also, https://stackoverflow.com/a/22056002/331668 .

var queue = new Queue(
  admin.database().ref('queues/toggle'), {
    'numWorkers': 1,
    'sanitize': false,
    'suppressStack': false
  }, function (data, progress, resolve, reject) {

  try {
    var promise = new Promise(function (resolve1, reject1) {
      led.writeSync(1);
      setTimeout(() => {
         try {
           led.writeSync(0);
           resolve1('done');
         } catch(reason1) {
           reject1(reason1)
         }
       }, 500);
    })
    .then(resolve, reject);
  } catch(reason) {
    reject(reason)
  }
});


process.on('SIGINT', function() {
  led.unexport();
  queue.shutdown().then(function() {
    process.exit(0);
  });
});
