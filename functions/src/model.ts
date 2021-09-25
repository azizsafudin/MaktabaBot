export const SCENES = {
  SUPER_WIZARD: "@WIZARD_SCENE",
  MAIN_MENU: "@MAIN_MENU",
};

export const SCENE_ENTRYPOINTS = {
  [SCENES.SUPER_WIZARD]: "wizard",
  [SCENES.MAIN_MENU]: "menu",
};

export default {
  SCENES,
  SCENE_ENTRYPOINTS,
};