import { Composer, Context, Telegraf } from "telegraf"
import LocalSession from "telegraf-session-local"
import { Update } from "telegraf/typings/core/types/typegram"
import { bots } from "../bots"
import { SCENE_ENTRY_COMMAND } from "../bots/scenes/model"

export const createBot = (
  middlewares: Composer<any>[]
) => (
  token: string, 
  options: Partial<Telegraf.Options<Context<Update>>> | undefined = {
    telegram: { webhookReply: true },
  }
) => {
  const bot = new Telegraf<any>(token, options) 

  bot.catch((err, ctx) => {
    return ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`, err)
  })

  const session = new LocalSession<any>({
    storage: LocalSession.storageMemory
  })

  bot.use(session.middleware())

  // Register middlewares
  registerMiddlewares(middlewares)(bot)

  // register scene entrances
  registerSceneEntrance(bot)

  return bot
}


const registerMiddlewares = (middlewares: Composer<any>[]) => (bot: Telegraf<any>) => {
  middlewares.forEach(middleware => bot.use(middleware));
}

const registerSceneEntrance = (bot: Telegraf<any>) => {
  for (const [sceneId, command] of Object.entries(SCENE_ENTRY_COMMAND)) {
    bot.command(command, async (ctx) => {
      ctx.scene.enter(sceneId)
      console.log(ctx)
    }) 
  }
}

export const createDefaultBot = createBot(bots)