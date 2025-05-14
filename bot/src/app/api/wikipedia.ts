async function fetchArticleSnippet(searchTerm) {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(
      searchTerm
    )}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    const { pageid, title } = searchData.query.search[0];

    const articleUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exsentences=5&pageids=${pageid}`;
    const articleResponse = await fetch(articleUrl);
    const articleData = await articleResponse.json();

    const snippet = articleData.query.pages[pageid].extract;

    return `${snippet}`;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Usage
const searchTerm = "Black-necked grebe";
fetchArticleSnippet(searchTerm)
  .then((snippet) => {
    console.log(snippet);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
