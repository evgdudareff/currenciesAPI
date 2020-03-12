### Задание по React

Реализовать API сервис для получения данных

Необходимо создать:

Скрипт для парсинга валют с адреса [http://www.cbr.ru/scripts/XML_daily.asp](http://www.cbr.ru/scripts/XML_daily.asp)
(будет плюсом создание cron job через pm2)

Реализовать 2 REST API метода:
GET /currencies — должен возвращать список курсов валют с возможность пагинации
GET /currency/{id} — должен возвращать курс валюты для переданного id

БД любая, предпочтение mongodb
API должно быть закрыто bearer авторизацией.

Желательно в проекте увидеть:
Typescript
\*Lint(tslint, eslint)
Документация оформленная в swagger
Использование демонов ноды(pm2, nodemon)
Код оформить в любой публичный репозиторий

### `npm i`

Устанавливает зависимости

### `npm run start`

Запуск проекта API. Доступен по URL [http://localhost:8000](http://localhost:8000)

### Документация API

Документация API создана в PostMan и доступна по [адресу](https://documenter.getpostman.com/view/8930560/SzS1ToUr?version=latest#intro)
