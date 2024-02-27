import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {RequestStatusType, setStatusAC, SetStatusACType} from '../../app/app-reducer';


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus:"idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLIST':
            //получаем тл с сервера и приводим их к типу TodolistDomainType и получ массив объектов нужного формата.
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus:"idle"}))
        default:
            return state;
    }
}

//actions
export const removeTodolistAC = (id: string) => {
    return {type: 'REMOVE-TODOLIST', id} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
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


//thunks
//thunkCreator- функ, которая возвр функцию Санку ()={ return ()=>{} }
export const fetchTodolistTC = () => {
    return async (dispatch: Dispatch<ActionsType | SetStatusACType>) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then(res =>
                dispatch(setTodolistsAC(res.data)))
        dispatch(setStatusAC('succeeded'))
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => dispatch(removeTodolistAC(todolistId)))
    }
}
export const addTodolistTC = (title: string) => {
    return async (dispatch: Dispatch<ActionsType |SetStatusACType>) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then(res => dispatch(addTodolistAC(res.data.data.item)))
        dispatch(setStatusAC('succeeded'))
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return async (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => dispatch(changeTodolistTitleAC(todolistId, title)))
    }
}

//types
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsACType

export type FilterValuesType = 'all' | 'active' | 'completed';
//адаптированиа нашего старого ТЛтипа и того, который с сервера придет
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus:RequestStatusType }
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>


