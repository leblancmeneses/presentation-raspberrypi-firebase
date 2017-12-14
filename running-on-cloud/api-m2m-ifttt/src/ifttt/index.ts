import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// https://firebase.google.com/docs/functions/http-events
export const hook = functions.https.onRequest(async (req, res) => {
  const original = req.body;

  const authTokenKey = `h6tc4C#D-@4pDG$nMX-aF4RR*V#ysPQa`;

  // if(!req.headers.hasOwnProperty("x-auth-token-key")) {
  //   res.status(400).send("missing x-auth-token-key");
  //   return;
  // }

  // if(req.headers["x-auth-token-key"] != authTokenKey) {
  //   res.status(401).send(JSON.stringify(req.headers));
  //   return;
  // }
  
  // Add more model validations: bad request 400.
  


  try {
    await admin.database().ref('/queues/toggle/tasks')
      .push({
          createdBy: 'lmeneses',
          createdDate: new Date().getTime(),
          lat: 0,
          long: 0
       });
  } catch(ex) {
    console.log(ex);
    res.status(500).send(ex);
    return;
  }
  res.status(200).send("");
});
