// Scene IDs
export enum SCENES {
  SUPER_WIZARD = "@WIZARD",
  MAIN_MENU = "@MAIN_MENU",
  BORROW = "@BORROW",
  LEND = "@LEND",
}

export enum ACTION {
  MENU = "menu",
  BORROW = "borrow",
}

// command -> scene_id
export const ACTION_SCENE_MAP = {
  [ACTION.MENU]: SCENES.MAIN_MENU,
  // [ACTION.BORROW]: SCENES.BORROW,
};
