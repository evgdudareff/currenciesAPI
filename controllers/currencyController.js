const fs = require('fs').promises;

// Функция: получить курс валюты (поддерживает пагинацию через параметры page и limit)
exports.getCurrencies = async (req, res) => {
  let { page, limit } = req.query;

  const file = await fs.readFile(`${__dirname}/../data.json`);
  let currencies = JSON.parse(file)['ValCurs']['Valute'];

  if (
    page >= 1 &&
    page < currencies.length / limit &&
    limit >= 1 &&
    limit < currencies.length
  ) {
    page *= 1;
    limit *= 1;

    const skip = (page - 1) * limit;
    currencies = currencies.slice(skip, skip + limit);
  }

  res.status(200).json({
    status: 'success',
    results: currencies.length,
    data: {
      currencies
    }
  });
};

// Функция: получить курс валюты по ID валюты
exports.getCurrencyById = async (req, res) => {
  const { id } = req.params;
  let currency = null;

  const file = await fs.readFile(`${__dirname}/../data.json`);
  const currencies = JSON.parse(file)['ValCurs']['Valute'];

  if (id) {
    currency = currencies.find(item => item['$']['ID'] === id);
  }

  if (currency) {
    res.status(200).json({
      status: 'success',
      data: {
        currency
      }
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
};
