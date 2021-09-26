import { Composer } from "telegraf";
import { ACTION_SCENE_MAP } from "../../models/scene";

const bot = new Composer();

const re = new RegExp("^/start (.+)$");

interface DeepLink {
  action: string;
  args: string[];
  link?: string;
}

// e.g borrow-m0001
const parseDeepLink = (link: string): DeepLink => {
  const parts = link.split("-");
  const [action, ...args] = parts;

  if (ACTION_SCENE_MAP[action as keyof typeof ACTION_SCENE_MAP] === undefined) {
    throw new Error(`Invalid action: "${link}". Please contact admins.`);
  }

  return {
    action,
    args,
    link,
  };
};

bot.hears(re, async (ctx: any) => {
  const matches = ctx.message.text.match(re);
  if (matches) {
    const deepLink = parseDeepLink(matches[1]);
    if (deepLink) {
      ctx.scene?.enter(
        ACTION_SCENE_MAP[deepLink.action as keyof typeof ACTION_SCENE_MAP],
        deepLink.args
      );
    }
  }
});

const WELCOME_MESSAGE =
  "Hello! Welcome to Maktaba Books! What would you like to do today?";

bot.command("/start", (ctx) => ctx.reply(WELCOME_MESSAGE));

export default bot;
