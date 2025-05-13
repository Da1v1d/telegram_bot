import { Context, InputFile } from "grammy";
import { getUserStories } from "../../api/instagram.js";

export async function storiesConversation(conversation, ctx: Context) {
  await ctx.reply("Please enter public instagram user url or username");
  const { message } = await conversation.wait();
  try {
    const response = await getUserStories(message.text);
    if (response.status === 404) {
      ctx.reply("User doesn't exist");
      return;
    }
    const {
      data: { items: stories },
    } = await response.json();
    if (!stories.length) {
      ctx.reply("This user has no posted story");
    }
    stories.map((story) => {
      if (story.video_url) {
        ctx.replyWithVideo(
          new InputFile({
            url: story.video_url,
          })
        );
      } else ctx.replyWithPhoto(new InputFile({ url: story.thumbnail_url }));
    });
  } catch (error) {
    console.log(error);
    ctx.reply("Something went wrong please try again");
  }
}
