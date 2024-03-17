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
};
