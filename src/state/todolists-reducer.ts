import {v1} from 'uuid';
import {todolistsAPI, TodolistType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export type FilterValuesType = 'all' | 'active' | 'completed';

//адаптированиа нашего старого ТЛтипа и того, который с сервера придет
export type TodolistDomainType = TodolistType & { filter: FilterValuesType }

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsACType

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state]
        }
        //получаем тл с сервера и приводим их к типу TodolistDomainType и получ массив объектов нужного формата.
        case 'SET-TODOLIST': {
            return action.todolists.map(tl => {
                return {...tl, filter: 'all'}
            })

        }
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLIST', todolists} as const
}
/*//thunk
export const fetchTodolistThunk = (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
}*/
//thunkCreator- функ, которая вовзвр функцию Санку ()={ return ()=>{} }
export const fetchTodolistTC = () => {
    return async (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then(res => dispatch(setTodolistsAC(res.data)))
    }
}

