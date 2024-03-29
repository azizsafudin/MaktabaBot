/* eslint-disable @typescript-eslint/no-floating-promises */
import { Composer, Markup, Scenes } from "telegraf";
import { SCENES } from "../models/scene";

const stepHandler = new Composer<Scenes.WizardContext>();
stepHandler.action("next", async (ctx) => {
  await ctx.reply("Step 2. Via inline button");
  return ctx.wizard.next();
});
stepHandler.command("next", async (ctx) => {
  await ctx.reply("Step 2. Via command");
  return ctx.wizard.next();
});
stepHandler.use((ctx) =>
  ctx.replyWithMarkdown("Press `Next` button or type /next")
);

const scene = new Scenes.WizardScene(
  SCENES.SUPER_WIZARD,
  async (ctx) => {
    await ctx.reply(
      "Step 1",
      Markup.inlineKeyboard([
        Markup.button.url("❤️", "http://telegraf.js.org"),
        Markup.button.callback("➡️ Next", "next"),
      ])
    );
    return ctx.wizard.next();
  },
  stepHandler,
  async (ctx) => {
    await ctx.reply("Step 3");
    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply("Step 4");
    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply("Done");
    return await ctx.scene.leave();
  }
);

export default scene;
