import { Markup } from "telegraf";

export const createSimpleMenuButtons = (...menuBtns: Array<string[]>) => {
  const buttons = menuBtns.map(([label, action]) =>
    Markup.button.callback(label, action)
  );
  return Markup.inlineKeyboard(buttons);
};
