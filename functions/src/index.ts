import * as functions from "firebase-functions";
import { createDefaultBot } from "./utils";

const bot = createDefaultBot(functions.config().telegram.token);

// handle all telegram updates with HTTPs trigger
export const maktabaBot = functions.https.onRequest(async (request, response) => {
	return await bot.handleUpdate(request.body, response)
})