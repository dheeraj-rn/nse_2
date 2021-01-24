const cors = require("cors");
const CronJob = require('cron').CronJob;
const auth = require("./auth");
const stocks = require("./stocks");
const crondata = require("../controllers/populate");

module.exports = app => {
  const job = new CronJob('0 18 * * *', async () => {
    await crondata.populate()
  }, null, true, 'Asia/Kolkata');
  job.start();

  app.use(cors());

  // Auth endpoints
  app.use("/auth", auth);
  app.use("/stocks", stocks);
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.all("*", (req, res) =>
    res.status(404).send({
      status: 404,
      message: "You are lost"
    })
  );
};
