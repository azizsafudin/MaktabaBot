/* eslint-disable @typescript-eslint/no-floating-promises */
import { Composer, Markup, Scenes } from 'telegraf'
import { WizardContext } from 'telegraf/typings/scenes';
import { SCENES } from './model';

const MENU_MESSAGE = `What would you like to do today?`

const stepHandler = new Composer<Scenes.WizardContext>()

const borrowHandler = async (ctx: WizardContext) => {
  await ctx.reply('Borrow')
  return ctx.wizard.next()
}

const lendHandler = async (ctx: WizardContext) => {
  await ctx.reply('Lend')
  return ctx.wizard.next()
}

stepHandler.action('borrow', borrowHandler)
stepHandler.command('/borrow', borrowHandler)

stepHandler.action('lend', lendHandler)
stepHandler.command('/lend', lendHandler)

stepHandler.use((ctx) =>
  ctx.replyWithMarkdown('Select one of the options or use /borrow or /lend')
)

const scene = new Scenes.WizardScene(
  SCENES.MAIN_MENU,
  async (ctx) => {
    await ctx.reply(
      MENU_MESSAGE,
      Markup.inlineKeyboard([
        Markup.button.callback('Borrow', 'borrow'),
        Markup.button.callback('Lend', 'lend'),
      ])
    )
    return ctx.wizard.next()
  },
  stepHandler,
  async (ctx) => {
    return await ctx.scene.leave()
  }
)

export default scene