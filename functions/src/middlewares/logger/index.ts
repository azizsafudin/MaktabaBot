import { Composer } from "telegraf";
import { info } from "firebase-functions/lib/logger";

const bot = new Composer();

const LOG_TYPES = {
  NEW_MESSAGE: "@TG.NEW_MESSAGE",
};

bot.use((ctx, next) => {
  info(LOG_TYPES.NEW_MESSAGE, ctx.message);
  return next();
});

export default bot;
