import dotenv from "dotenv";
import { Bot, Context } from "grammy";

dotenv.config();

export const bot = new Bot<Context>(process.env.BOT_API_KEY);
