export const getUserStories = async (userNameOrUrl) => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.X_RapidAPI_Key,
      "X-RapidAPI-Host": process.env.X_RapidAPI_Host,
    },
  };
  try {
    const response = await fetch(
      `${process.env.INSTAGRAM_API}stories?username_or_id_or_url=${userNameOrUrl}`,
      options
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    return error;
  }
};
