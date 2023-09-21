import { TasksStateType} from '../App';
import {v1} from 'uuid';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todoList1,
    todoList2
} from './todolists-reducer';


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskID: string
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    todolistID: string
}
export type changeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS',
    taskID: string
    isDone: boolean
    todolistID: string
}
export type changeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE',
    taskID: string
    title: string
    todolistID: string
}

type  ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState={
    [todoList1]: [
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false}
    ],
    [todoList2]: [
        {id: v1(), title: "milk", isDone: true},
        {id: v1(), title: "bread", isDone: true},
        {id: v1(), title: "cheese", isDone: false}
    ]
}


export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistID]: state[action.todolistID].filter(tl => tl.id !== action.taskID)}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)

            }
        }
        // при созд тудулиста создаем пустой массив тасок
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskID} as const
}
export const addTaskAC = (title: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): changeTaskStatusACType => {
    return {type: 'CHANGE-TASK-STATUS', taskID, isDone, todolistID}
}
export const changeTaskTitleAC = (title: string, taskID: string, todolistID: string): changeTaskTitleACType => {
    return {type: 'CHANGE-TASK-TITLE', title, taskID, todolistID}
}

