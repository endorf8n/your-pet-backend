const mongoose = require("mongoose");
const app = require("./app");
const cron = require("node-cron");
const { updateNews } = require("./api/news/updateNews");
const { DB_HOST, PORT = 5000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection succesful");
    cron.schedule('0 8 * * *', async () => {
      console.log('Update news at 8 AM!!!');
      try {
        await updateNews();
        console.log('Update successful!');
      } catch (error) {
        console.log('Failed to update news:');
        setTimeout(() => {
          console.log('Retrying update in 1 minute...');
          cron.schedule('30 * * * *', async () => {
            try {
              console.log('Retrying update...');
              await updateNews();
              console.log('Update successful!');
            } catch (retryError) {
              console.log(retryError);
              console.log('Retry failed:');
            }
          });
        }, 60000);
      }  
    })

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
