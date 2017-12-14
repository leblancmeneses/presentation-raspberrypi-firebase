import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import * as ifttt_sample from './ifttt';

admin.initializeApp(functions.config().firebase);

export const iftttSample = ifttt_sample.hook;
