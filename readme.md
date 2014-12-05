<p align="center">
  <a href="https://github.com/NeXidan/team-3">
    <img height="67" width="268" src="https://cloud.githubusercontent.com/assets/8440686/5315471/d48a1efa-7c8e-11e4-8a0d-22d4c54ad90d.png">
  </a>
</p>


Коллаборативный редактор кода на основе комбо [Swarm.js](https://github.com/gritzko/swarm) + [React.js](https://github.com/facebook/react)
 
## Установка
 
    git clone https://github.com/NeXidan/team-3
    npm install

Сервер запустится по адресу http://localhost:1337/

Known Bug: иногда для правильного функионирования gulp'а потребуется создать файлы index.js, step.js, popup.js в директории ./dist/views/

## Структура:

- `public/` -- Несобранные gulp'ом исходники
    - `css/` -- Наборы стилей (.css)
    - `images/` -- Различные изображения
    - `js/` -- Javascript файлы (.js)
    - `views/` -- Шаблоны React'a (.jsx)
- `models/` -- Модели Swarm'a
- `dist/` -- Результат работы gulp'a, все собранные клиентские файлы
 
## Вклад в проект:

##### Клиент:
- верстка html;
- css стили;
- дизайн проекта;
- помощь в разработке синхронизации текста Swarm'ом;

##### Сервер:
- скрипт сборки автоматического запуска gulp'a и cthdthf;

## Собственные изменения:

##### Инфраструктура
- переработана структура папок проекта;

##### Клиент:
- переход с Backbone на React (модно, стильно, молодежно);
- документы со своим id;
- пользователи, находящиеся онлайн;
- курсоры каждого пользователя различного цвета;
- мини-чат (так же на Swarm, почему бы и нет?) (недоработан);

##### Сервер:
- полностью переработан сервер для работы с SharedWebStorag'ем Swarm'a и рендеринга страниц React'ом;
