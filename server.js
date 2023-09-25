const mongoose = require("mongoose");
const app = require("./app");
const cron = require("node-cron");
const { updateNews } = require("./api/news/updateNews");
const { DB_HOST, PORT = 5000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection succesful");
    cron.schedule('0 3 * * *', () => {
      console.log('Update news at 3 AM!!!');
      updateNews();
    })

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
