const axios = require('axios');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();
const iconv = require('iconv-lite');
const fs = require('fs').promises;

iconv.skipDecodeWarning = true;

// Функция: получить и обработать данные
const getDataFromServer = async () => {
  let response;
  // запрос данных
  try {
    response = await axios({
      url: 'http://www.cbr.ru/scripts/XML_daily.asp',
      method: 'GET',
      responseEncoding: 'binary'
    });
  } catch (err) {
    console.log('getting data from server failed. Retrying...');
    return;
  }
  // раскадировка данных
  const data = iconv.decode(response.data, 'win1251');

  //парсинг xml
  let result;
  try {
    result = await parser.parseStringPromise(data);
  } catch (err) {
    return;
  }

  //сохранить данные на диск
  try {
    await fs.writeFile(`${__dirname}/data.json`, JSON.stringify(result));
    console.log('Currencies data has been updated');
  } catch (err) {
    return;
  }
};

module.exports = getDataFromServer;
