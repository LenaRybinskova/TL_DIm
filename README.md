# 16 initializedAppTC

```
function App({demo = false}: PropsType) {

    №2 // после крутилки отраб useEffect и запускает initializedAppTC, которая проверяет, залогинена? (=кука создана?)
    useEffect(() => {
        №3 dispatch(initializedAppTC()) // если кука есть => isLoggedIn=true 
    }, [])


    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    №1 //пока прил инициализируется(со старта -фолс) - крутилка, считаем Арр JSX свой вернула
    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    №4 useEffect отработал, пошли по дефолтному <Route path="/" element={<TodolistsList demo={demo}/>}/>
    return (
        <Routes>
             {/*если  URL только слеш, то список ТЛ - это со старта приложения*/}
             <Route path="/" element={<TodolistsList demo={demo}/>}/>
             {/*если в URL login, то рендериться компонента Login*/}
             <Route path="login" element={<Login/>}/>
             <Route path={'/404'}
                element={<h1>PAGE NOT FOUND</h1>}></Route> {/*// сделали чтобы ошибке в урл было 404*/}
             <Route path={'*'} element={<Navigate to={'/404'}/>}/>
        </Routes>
            )
```

# 16 formic

formic контролирует стейт формы через локальный стейт

аналог formic -  redux form, но redux form контролирует стейт формы через redux,это не удобно тк все введения в инпуты попадают в стор, а на стор много кто подписан.это неэффестивно.

собрать данные из формы, задиспатчить (отправить на сервер), если ответ ок то сделать редирект с страницы


# 14 Thunk

ThunkCreator - то функ, принимает dispatch , getState(весь стейт). Это асинхр функ, ее особенность в том, что в ней можно осуществлять все сайд эффекты.

Возвращает другую функцию(санку). Диспач импортирует из Редакс.

Является частью Bll(Redux).

Ui( диспатчим TC) -- Redux (TC возвр функ, которая делает асинх запрос на сервер и эти данные dispatch в AC --> Reducer--> меняется cтейт )


# 14 кастомные хуки

Это функ, название обязательно с use. Внутри кастомных хуков можно исп реакт хуки.



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






