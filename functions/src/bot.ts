import { Context, Telegraf } from "telegraf"
import LocalSession from "telegraf-session-local"
import { Update } from "telegraf/typings/core/types/typegram"
import { middlewares } from "./middlewares"
import { scenes } from "./scenes"
import { SCENE_ENTRY_COMMAND } from "./scenes/model"
import { registerMiddlewares, registerSceneEntrance, registerScenes, registerSession } from "./utils"

export const createBot = (
  token: string, 
  options: Partial<Telegraf.Options<Context<Update>>> | undefined = {
    telegram: { webhookReply: true },
  }
) => {
  const bot = new Telegraf<any>(token, options) 

  // Add error handling
  bot.catch((err, ctx) => {
    return ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`, err)
  })

  // Add local session
  registerDefaultSession(bot)

  // Register all sub-bots
  registerDefaultMiddlewares(bot)

  // Register scenes on a stage
  registerDefaultScenes(bot)

  // register scene entrances
  registerDefaultSceneEntrance(bot)

  return bot
}

const registerDefaultSession = registerSession(new LocalSession<any>({
  storage: LocalSession.storageMemory
}))

const registerDefaultMiddlewares = registerMiddlewares(middlewares)

const registerDefaultScenes = registerScenes(scenes)

const registerDefaultSceneEntrance = registerSceneEntrance(SCENE_ENTRY_COMMAND)
