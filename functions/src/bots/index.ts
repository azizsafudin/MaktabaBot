import welcome from "./welcome"
import { Telegraf } from "telegraf"

const bots = [
  welcome
]

export const addMiddlewares = (bot: Telegraf) => {
  bots.forEach(b => bot.use(b));
}
