const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
    "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
  },
};

export const getUserStories = async (userNameOrUrl) => {
  return await fetch(
    `${process.env.INSTAGRAM_API}stories?username_or_id_or_url=${userNameOrUrl}`,
    options
  );

  try {
    const response = await fetch(
      `${process.env.INSTAGRAM_API}stories?username_or_id_or_url=${userNameOrUrl}`,
      options
    );
    if (response.status === 404) {
      throw new Error(`User doesn't exist`);
      ctx.reply("User doesn't exist");
    }
  } catch (error) {}
};
