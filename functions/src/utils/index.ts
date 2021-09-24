import { Composer, Context, Scenes, Telegraf } from "telegraf"
import LocalSession from "telegraf-session-local"
import { Update } from "telegraf/typings/core/types/typegram"
import { bots } from "../bots"
import { scenes } from "../bots/scenes"
import { SCENE_ENTRY_COMMAND } from "../bots/scenes/model"
import { BaseScene, WizardContext, WizardScene } from "telegraf/typings/scenes"

export const createBot = (
  middlewares: Composer<any>[]
) => (
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

  // Add session
  const session = new LocalSession<any>({
    storage: LocalSession.storageMemory
  })
  
  bot.use(session.middleware())

  // Register all sub-bots
  registerMiddlewares(middlewares)(bot)

  // Register scenes on a stage
  registerScenes(scenes)(bot)

  // register scene entrances
  registerSceneEntrance(bot)

  return bot
}


const registerMiddlewares = (middlewares: Composer<any>[]) => (bot: Telegraf<any>) => {
  middlewares.forEach(middleware => bot.use(middleware));
}

const registerScenes = (scenes: Array<BaseScene | WizardScene<WizardContext>>) => (bot: Telegraf<any>) => {
  const stage = new Scenes.Stage<any>(scenes)
  bot.use(stage.middleware())
}

const registerSceneEntrance = (bot: Telegraf<any>) => {
  for (const [sceneId, command] of Object.entries(SCENE_ENTRY_COMMAND)) {
    bot.command(command, async (ctx) => {
      ctx.scene.enter(sceneId)
    }) 
  }
}

export const createDefaultBot = createBot(bots)