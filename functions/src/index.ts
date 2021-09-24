import * as functions from "firebase-functions";
import { Telegraf } from "telegraf";
import { addMiddlewares } from "./bots";

// Init new bot
const bot = new Telegraf(functions.config().telegram.token, {
	telegram: { webhookReply: true },
})

// error handling
// @ts-expect-error
bot.catch((err, ctx) => {
	functions.logger.error('[Bot] Error', err)
  // @ts-ignore
	return ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`, err)
})

// initialize the commands
addMiddlewares(bot)

// handle all telegram updates with HTTPs trigger
export const maktabaBot = functions.https.onRequest(async (request, response) => {
	functions.logger.log('Incoming message', request.body)
	return await bot.handleUpdate(request.body, response)
})