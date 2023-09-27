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
    throw new Error(error.message);
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
    throw new Error(error.message);
  }
};

const updateNews = async () => {
  try {
    const news = await fetchAllNews();
    if (news.length === 0) {
      throw new Error("No news fetched. Update canceled.");
    }

    const allHaveRequiredFields = news.every(
      (item) =>
        item.uuid &&
        item.title &&
        item.description &&
        item.url &&
        item.image_url &&
        item.published_at
    );

    if (!allHaveRequiredFields) {
      throw new Error(
        "Not all news items have all required fields. Update canceled."
      );
    }

    await New.deleteMany();
    await New.insertMany(news);
    console.log("Update news done!");
  } catch (error) {
    throw new Error(error.message);
  }
};

// const currentDate = new Date();

// // Дата, з якою порівнюємо
// const targetDate = new Date('10-10-2010');

// // Обчислюємо різницю у мілісекундах
// const differenceInMilliseconds = currentDate - targetDate;

// // Кількість мілісекунд в році (приблизно)
// const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;

// // Обчислюємо різницю в роках
// const differenceInYears = differenceInMilliseconds / millisecondsPerYear;

// console.log(Різниця в роках: ${Math.ceil(differenceInYears)});

module.exports = {
  updateNews,
};
