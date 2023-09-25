const { THENEWS_API_TOKEN, THENEWS_BASE_URL } = process.env;
const axios = require("axios");
const New = require("../../models/new");

const page = 1;
const limit = 10;

const options = {
  baseURL: THENEWS_BASE_URL,
  params: {
    api_token: THENEWS_API_TOKEN,
    locale: "us",
    language: "en",
  },
};

const getNews = async (page) => {
  try {
    const response = await axios.get(`/news/top?page=${page}`, options);
    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchAllNews = async () => {
  const promises = [];
  const finalNews = [];
  for (let i = page; i <= limit; i++) {
    promises.push(getNews(i));
  }
  try {
    const allNews = await Promise.all(promises);

    allNews.forEach((news) => {
      finalNews.push(...news);
    });

    console.log(finalNews);
    return finalNews;
  } catch (error) {
    console.log(error.message);
  }
};

const updateNews = async () => {
  try {
    await New.deleteMany();
    const news = await fetchAllNews();
    await New.insertMany(news);

    console.log(news);
    console.log("Upate news done!");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  updateNews,
};
