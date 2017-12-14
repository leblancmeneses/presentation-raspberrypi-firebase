import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as petition_robocaller from './ifttt';

admin.initializeApp(functions.config().firebase);

export const twilioPetitionsRobocaller = petition_robocaller.hook;
