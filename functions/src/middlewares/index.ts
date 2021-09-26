import logger from "./logger";
import user from "./user";
import start from "./start";

const middlewares = [logger, user, start];

export default middlewares;
