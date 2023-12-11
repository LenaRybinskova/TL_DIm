# 13 snapshot

```
yarn add puppeteer jest-puppeteer jest-image-snapshot start-server-and-test jest jest-environment-jsdom --dev
📋
```
```
"jest:integration": "jest -c integration/jest.config.js",
"test:integration": "start-server-and-test storybook http-get://localhost:9009 jest:integration"
📋
```

создать integration папку с файлами setupTests.js
```
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });
```
и jest.config.js

```
 module.exports = {
   preset: 'jest-puppeteer',
   testRegex: './*\\.test\\.js$',
   setupFilesAfterEnv: ['./setupTests.js']
};
```
```
yarn run jest:integration --updateSnapshot  обновить эталонный вид
```

# 12 Storybook

```
npx storybook@latest init
```

npx sb init не ставила, выдает ошибку babelOption

storybook запускает отдельный свой сервер

если ошибка установки, почистить кэш npm (-- force значит принудительно)

```
npx cache clear -- force
```

если опять ошибка - удалить node_modules и yarn.lock

```
yarn install
```

переоткрыть webshtorm.

поменять порт на 9009 "storybook": "storybook dev -p 9009"

Декоратор - это функция, по сути схожа с ХОК коннект,обертка со Стором,которая принимает др функцию(историю) и вызывает
ее.
Чтобы не делать такую обертку для каждой истории, есть концепция декораторов.

```
yarn add @storybook/addon-storysource --dev
```

для ui тестирования
```
yarn add puppeteer jest-puppeteer jest-image-snapshot start-server-and-test --dev
```
добавить скрипты

"jest:integration": "jest -c integration/jest.config.js",
"test:integration": "start-server-and-test storybook http-get://localhost:9009 jest:integration"


# 11 useCallBack, React.memo()

Каждую комп оборачиваем в React.memo(), компон из styled-component уже обернуты

Если передаем в компон callback - обернуть в useCallBack передаваемый коллбек ( в род компон)

Хуки внутри мар() нельзя использовать, поэтому то что мапится нужно вынести в отдельную компоненту

# 10 App с использование Redux (react-redux)

yarn add redux react-redux


# 10: App c использованием useReducer

ВАЖНО:
если сгенерировали ID тудулиста в AC, то чтобы задиспатчить, нужно создать сначала ОДИН экшен и его диспатчить во все редьюсеры, иначе ID сгенерируется везде разный

```
<AppWithReducers>

function addTodolist(title: string) {
        const action = addTodolistAC(title) - создала один экшен в конкретным ID тудулиста
        dispatchTodoLists(action)
        dispatchTasks(action)
    }
```






