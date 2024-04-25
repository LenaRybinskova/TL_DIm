import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {RequestStatusType, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            // index > -1 значит такой индекс существует
            if (index > -1) {
                state.splice(index, 1) //вырезать splice(index, 1)
            }
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistEntityAC(state, action: PayloadAction<{ id: string, statusEntity: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].entityStatus = action.payload.statusEntity
            }
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        setTodolistsAC(state, action: PayloadAction<{ todolists: TodolistType[] }>) {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
    }
})
export const todolistsReducer = slice.reducer
export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistEntityAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC
} = slice.actions


//thunks
//thunkCreator- функ, которая возвр функцию Санку ()={ return ()=>{} }
export const fetchTodolistTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
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
    (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'})) // общая крутилка включится
        dispatch(changeTodolistEntityAC({id: todolistId, statusEntity: 'loading'}))  //у ТЛ статус поменятся и забизейблитсся все
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodolistAC({id: todolistId}))
                    dispatch(setAppStatusAC({status: 'succeeded'})) // откл общую крутилку
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(error => handleServerNetworkError(error, dispatch))
    }

export const addTodolistTC = (title: string) => {
    return async (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
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
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({id: todolistId, title: title}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(error => handleServerNetworkError(error, dispatch))
    }
}


/*//types
type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsACType
    | ChangeTodolistEntityACType*/


export type FilterValuesType = 'all' | 'active' | 'completed';
//адаптированиа нашего старого ТЛтипа и того, который с сервера придет
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityACType = ReturnType<typeof changeTodolistEntityAC>
type ThunkDispatch = Dispatch</*ActionsType */| SetAppStatusACType | SetAppErrorACType>


/*// было на Редакс
import {todolistsAPI, TodolistType} from '../../api/todolists-api';
import {Dispatch} from 'redux';
import {RequestStatusType, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


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


//thunks
//thunkCreator- функ, которая возвр функцию Санку ()={ return ()=>{} }
export const fetchTodolistTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC({status:'succeeded'}))
            })
            .catch(error=>{handleServerNetworkError(error, dispatch)
                    /!*                handleServerAppError(error, dispatch) я добавляла для теста*!/
                }
            )

    }
}
//я делала then-catch
export const removeTodolistTC = (todolistId: string) =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC({status:'loading'})) // общая крутилка включится
        dispatch(changeTodolistEntityAC(todolistId, 'loading'))  //у ТЛ статус поменятся и забизейблитсся все
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                if(res.data.resultCode===0){
                    dispatch(removeTodolistAC(todolistId))
                    dispatch(setAppStatusAC({status:'succeeded'})) // откл общую крутилку
                }
                else{
                    handleServerAppError(res.data,dispatch)
                }
            }).catch(error =>handleServerNetworkError(error, dispatch) )
    }

export const addTodolistTC = (title: string) => {
    return async (dispatch: Dispatch<ActionsType | SetAppStatusACType>) => {
        dispatch(setAppStatusAC({status:'loading'}))
        todolistsAPI.createTodolist(title)
            .then(res => {
                if(res.data.resultCode===0){
                    dispatch(addTodolistAC(res.data.data.item))
                    dispatch(setAppStatusAC({status:'succeeded'}))
                }
                else{
                    handleServerAppError(res.data,dispatch)
                }
            })
            .catch(error=>
                handleServerNetworkError(error,dispatch)
            )
    }
}
//я делала then-catch
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        todolistsAPI.updateTodolist(todolistId, title)
            .then(res => {
                if(res.data.resultCode===0){
                    dispatch(changeTodolistTitleAC(todolistId, title))
                    dispatch(setAppStatusAC({status:'succeeded'}))
                }
                else{
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(error=>handleServerNetworkError(error, dispatch))
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


export type FilterValuesType = 'all' | 'active' | 'completed';
//адаптированиа нашего старого ТЛтипа и того, который с сервера придет
export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistEntityACType = ReturnType<typeof changeTodolistEntityAC>
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusACType | SetAppErrorACType>*/
