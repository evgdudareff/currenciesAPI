const { CronJob } = require('cron');
const dotenv = require('dotenv');
const app = require('./app');
const getDataFromServer = require('./utilities/getDataFromServer');

dotenv.config({ path: './config.env' });

// Создание cron job: получение данных по курсу валют каждые 30 сек
const job = new CronJob(
  '*/30 * * * * *',
  getDataFromServer,
  null,
  true,
  'Europe/Moscow',
  null,
  true
);

// Запуск сервера
app.listen(process.env.PORT || 8000, () => {
  console.log('App is running');
});
