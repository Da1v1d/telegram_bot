import "dotenv/config";
import { GrammyError, HttpError, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { bot } from "./bot/index.js";
import { storiesConversation } from "./bot/conversations/instagram.conversation.js";

bot.api.setMyCommands([
  { command: "story", description: "Download a public user posted stories" },
  { command: "delete_all", description: "Delete all previous messages" },
  { command: "cancel", description: "cancel current command" },
]);

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

bot.command("cancel", async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply("nati nati nati");
});
bot.use(createConversation(storiesConversation));

bot.command("start", async (ctx) => {
  await ctx.reply("Hey, thanks to join to bot");
});

bot.command("story", async (ctx) => {
  await ctx.conversation.enter("storiesConversation");
});

bot.command("delete_all", async (ctx) => {
  let res = await ctx.reply("deleting");
  for (let i = res.message_id; i >= 0; i--) {
    try {
      await ctx.api.deleteMessage(ctx.chat.id, i);
    } catch (e) {
      return;
    }
  }
});

bot.catch((err) => {
  const { ctx, error } = err;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  if (error instanceof GrammyError) {
    console.error("Error in request:", error.description);
  } else if (error instanceof HttpError) {
    console.error("Could not contact Telegram:", error);
  } else {
    console.error("Unknown error:", error);
  }
});

bot.start();
