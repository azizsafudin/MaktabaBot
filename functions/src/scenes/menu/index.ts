/* eslint-disable @typescript-eslint/no-floating-promises */
import { Composer, Scenes } from "telegraf";
import { WizardContext } from "telegraf/typings/scenes";
import { createSimpleMenuButtons } from "../../utils/ui";
import { SCENES } from "../../models/scene";

const MENU_MESSAGE = "What would you like to do today?";

const stepHandler = new Composer<Scenes.WizardContext>();

const borrowHandler = async (ctx: WizardContext) => {
  await ctx.reply("Which book do you want to borrow?");
  return ctx.wizard.next();
};

const lendHandler = async (ctx: WizardContext) => {
  await ctx.reply("Which book do you want to lend?");
  return ctx.wizard.next();
};

stepHandler.action("borrow", borrowHandler);
stepHandler.command("/borrow", borrowHandler);

stepHandler.action("lend", lendHandler);
stepHandler.command("/lend", lendHandler);

stepHandler.use((ctx) =>
  ctx.replyWithMarkdown("Select one of the options or use /borrow or /lend")
);

const scene = new Scenes.WizardScene(
  SCENES.MAIN_MENU,
  async (ctx) => {
    await ctx.reply(
      MENU_MESSAGE,
      createSimpleMenuButtons(
        ["Borrow a Book", "borrow"],
        ["Lend a Book", "lend"]
      )
    );
    return ctx.wizard.next();
  },
  stepHandler,
  async (ctx) => {
    await ctx.reply("Thank you");
    return await ctx.scene.leave();
  }
);

export default scene;
