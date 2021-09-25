import { Composer, Context, Middleware } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";

const addUser: Middleware<Context<Update>> = (ctx, next) => {
  const db: FirebaseFirestore.Firestore = ctx.state.db;
  const user = ctx.from;
  if (user) {
    db.collection("users").doc(String(user.id)).set(user);
  }
  return next();
};

const bot = new Composer();

bot.use(addUser);

export default bot;
