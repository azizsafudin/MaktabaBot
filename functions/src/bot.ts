import { Context, Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";
import { Update } from "telegraf/typings/core/types/typegram";
import middlewares from "./middlewares";
import scenes from "./scenes";
import { ACTION_SCENE_MAP } from "./models/scene";
import {
  registerMiddlewares,
  registerSceneEntrypoints,
  registerScenes,
  registerSession,
} from "./utils";

export const createBot = (
  token: string,
  database: FirebaseFirestore.Firestore,
  options: Partial<Telegraf.Options<Context<Update>>> | undefined = {
    telegram: { webhookReply: true },
  }
) => {
  const bot = new Telegraf<any>(token, options);

  // Add error handling
  bot.catch(async (err, ctx) => {
    await ctx.reply(`Ooops, encountered an error for ${ctx.updateType}`);
    return ctx.reply(`${err}`);
  });

  // Add firestore database to context
  bot.use((ctx, next) => {
    ctx.state.db = database;
    return next();
  });

  // Add local session
  registerDefaultSession(bot);

  // Register scenes on a stage
  registerDefaultScenes(bot);

  // Register all sub-bots
  registerDefaultMiddlewares(bot);

  // register scene entrances
  registerDefaultSceneEntrance(bot);

  return bot;
};

const registerDefaultSession = registerSession(
  new LocalSession<any>({
    storage: LocalSession.storageMemory,
  })
);

const registerDefaultMiddlewares = registerMiddlewares(middlewares);

const registerDefaultScenes = registerScenes(scenes);

const registerDefaultSceneEntrance = registerSceneEntrypoints(ACTION_SCENE_MAP);
