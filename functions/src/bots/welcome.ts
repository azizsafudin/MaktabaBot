import { Composer } from "telegraf"; 

const bot = new Composer

bot.command('/start', (ctx) => ctx.reply('Hello! Send any message and I will copy it.'))
bot.on('message', (ctx) => ctx.telegram.sendCopy(ctx.chat.id, ctx.message))

export default bot;
