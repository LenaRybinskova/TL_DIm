import {TasksStateType, TodolistType} from '../App';
import {addTodolistAC, removeTodolistAC, todolistsReducer} from './todolists-reducer';
import {tasksReducer} from './tasks-reducer';

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistType> = []

    const action = addTodolistAC('new todolist') // сгенерит ID и title тудулиста

    // отпр этот экшем в оба редьюсора
    const endTasksState = tasksReducer(startTasksState, action) // { 'f0b9f3c0-54bb-11ee-b2ca-114a3f707560': [] }
    const endTodolistsState = todolistsReducer(startTodolistsState, action) // [{id: '12786910-54bc-11ee-8a0b-63b7b4a92e65',title: 'new todolist', filter: 'all'}]

    const keys = Object.keys(endTasksState) // преобр в массив и взяли первый эл
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.todolistId) // проверяем что оба получ ИД равны сгенерированному в Экшен кр
    expect(idFromTodolists).toBe(action.todolistId)

})


test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '2', title: 'milk', isDone: true},
            {id: '3', title: 'tea', isDone: false}
        ]
    }

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
// по ИД тудулиста должны удаляться все соотв таски
    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})