import { Composer } from "telegraf"; 

const bot = new Composer()

bot.command('/start', (ctx) => ctx.reply('Hello! Welcome to Maktaba Books!'))

export default bot;
