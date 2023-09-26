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






