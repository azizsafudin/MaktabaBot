import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { createBot } from "./bot";

// Init firebase sdk
admin.initializeApp();
const db = admin.firestore();

const bot = createBot(functions.config().telegram.token, db);

// handle all telegram updates with HTTPs trigger
export const maktabaBot = functions
  .region("asia-southeast1")
  .https.onRequest(async (request, response) => {
    return await bot.handleUpdate(request.body, response);
  });
