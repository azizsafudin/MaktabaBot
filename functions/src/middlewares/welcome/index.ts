import { Composer } from "telegraf";

const bot = new Composer();

const WELCOME_MESSAGE =
  "Hello! Welcome to Maktaba Books! What would you like to do today?";

bot.command("/start", (ctx) => ctx.reply(WELCOME_MESSAGE));

export default bot;
