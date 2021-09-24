import { Composer, Scenes, Telegraf } from "telegraf"
import LocalSession from "telegraf-session-local"
import { BaseScene, WizardContext, WizardScene } from "telegraf/typings/scenes"

export const registerSession = (session: LocalSession<any>) => (bot: Telegraf<any>) => {
  bot.use(session.middleware())
} 

export const registerMiddlewares = (middlewares: Composer<any>[]) => (bot: Telegraf<any>) => {
  middlewares.forEach(middleware => bot.use(middleware));
}

export const registerScenes = (scenes: Array<BaseScene | WizardScene<WizardContext>>) => (bot: Telegraf<any>) => {
  const stage = new Scenes.Stage<any>(scenes)
  bot.use(stage.middleware())
}

export const registerSceneEntrance = (sceneCommandMap: Record<string, string>) => (bot: Telegraf<any>) => {
  for (const [sceneId, command] of Object.entries(sceneCommandMap)) {
    bot.command(command, async (ctx) => {
      ctx.scene.enter(sceneId)
    }) 
  }
}
