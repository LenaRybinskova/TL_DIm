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

# 10 App с использование Redux (react-redux)

yarn add redux react-redux


