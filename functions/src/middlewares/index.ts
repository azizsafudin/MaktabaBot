import logger from "./logger";
import user from "./user";
import welcome from "./welcome";

const middlewares = [logger, user, welcome];

export default middlewares;
