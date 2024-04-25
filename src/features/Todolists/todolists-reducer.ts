import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {RequestStatusType, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {fetchTasksTC} from './tasks-reducer';


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.statusEntity} : tl)
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLIST':
            //получаем тл с сервера и приводим их к типу TodolistDomainType и получ массив объектов нужного формата.
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        case 'CLEAR-DATA':
            return []
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
export const changeTodolistEntityAC = (id: string, statusEntity: RequestStatusType) => {
    return {
        type: 'CHANGE-TODOLIST-ENTITY-STATUS',
        statusEntity,
        id
    } as const
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
export const clearDataAC = () => {
    return {type: 'CLEAR-DATA'} as const
}


//thunks
//thunkCreator- функ, которая возвр функцию Санку ()={ return ()=>{} }
export const fetchTodolistTC = () => {
    return (dispatch: any) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
                return res.data
            })
            .then((todolists: TodolistType[]) => {
                todolists.forEach(tl => dispatch(fetchTasksTC(tl.id)))
            })
            .catch(error => {
                    handleServerNetworkError(error, dispatch)
                    /*                handleServerAppError(error, dispatch) я добавляла для теста*/
                }
            )

    }
}
//я делала then-catch
export const removeTodolistTC = (todolistId: string) =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading')) // общая крутилка включится
        dispatch(changeTodolistEntityAC(todolistId, 'loading'))  //у ТЛ статус поменятся и забизейблитсся все
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setAppStatusAC('succeeded')) // откл общую крутилку
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(error => handleServerNetworkError(error, dispatch))
    }

export const addTodolistTC = (title: string) => {
    return async (dispatch: Dispatch<ActionsType | SetAppStatusACType>) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error =>
                handleServerNetworkError(error, dispatch)
            )
    }
}
//я делала then-catch
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(todolistId, title))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(error => handleServerNetworkError(error, dispatch))
    }
}


//types
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsACType
    | ChangeTodolistEntityACType
    | clearDataACType


export type FilterValuesType = 'all' | 'active' | 'completed';
//адаптированиа нашего старого ТЛтипа и того, который с сервера придет
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityACType = ReturnType<typeof changeTodolistEntityAC>
export type clearDataACType = ReturnType<typeof clearDataAC>
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusACType | SetAppErrorACType>


