import "dotenv/config";
import { Bot, GrammyError, HttpError, InputFile, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { getUserStories } from "./instaAPI.js";

const bot = new Bot(process.env.BOT_API_KEY);

async function fetchStories(conversation, ctx) {
  await ctx.reply("Please enter public instagram user url or username");
  const { message } = await conversation.wait();
  const {
    data: { items: stories },
  } = await getUserStories(message.text);
  if (!stories.length) {
    ctx.reply("this user has no posted story");
  }
  stories?.map((story) => {
    if (story.video_url) {
      ctx.replyWithVideo(
        new InputFile({
          url: story.video_url,
        })
      );
    } else ctx.replyWithPhoto(new InputFile({ url: story.thumbnail_url }));
  });
}

bot.use(session({ initial: () => ({}) }));
bot.use(conversations());

bot.api.setMyCommands([
  { command: "story", description: "Download a public user story" },
  { command: "delete_all", description: "Delete all previous messages" },
  { command: "cancel", description: "cancel current command" },
]);

bot.command("cancel", async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply("nati nati nati");
});

bot.command("start", async (ctx) => {
  await ctx.reply("Hey, thanks to join to bot");
});

bot.use(createConversation(fetchStories));

bot.command("story", async (ctx) => {
  await ctx.conversation.enter("fetchStories");
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
  const { ctx } = err;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
