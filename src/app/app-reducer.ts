import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


const initialState:InitialStateType = {
    status: 'idle',
    error: null ,
    iSInitialized: false // глобально апп добавили значение проинициализировано оно или нет
}

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая то глобальная произойдет - мы запишем текст ошибки сюда
    error: null | string
    //true если прил проинициализировалось( проверили юзера, получили персон настройки юзера, язык ..)
    iSInitialized: boolean
}

export type  RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC:(stateDraft, action: PayloadAction<{status:RequestStatusType}>)=> {
            stateDraft.status=action.payload.status
        },
        setAppErrorAC:(stateDraft, action: PayloadAction<{error: string | null}>)=> {
           stateDraft.error=action.payload.error
        },
        setAppInitializedAC:(stateDraft, action: PayloadAction<{value: boolean}>)=> {
             stateDraft.iSInitialized=action.payload.value
        }
}
})
export const appReducer =slice.reducer
export const {setAppStatusAC,setAppErrorAC,setAppInitializedAC}=slice.actions


//thunk
export const initializedAppTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    } finally {
        dispatch(setAppInitializedAC({value: true})) //проиниц приложение в любом случае как то
    }

}

///types
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedACType = ReturnType<typeof setAppInitializedAC>




/*
// было до redux toolkit
import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, iSInitialized: action.value}
        default:
            return {...state}
    }
}

//action
export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}
export const setAppInitializedAC = (value: boolean) => {
    return {type: 'APP/SET-INITIALIZED', value} as const
}


//thunk
export const initializedAppTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    } finally {
        dispatch(setAppInitializedAC(true)) //проиниц приложение в любом случае как то
    }

}


///types
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedACType = ReturnType<typeof setAppInitializedAC>

type ActionsType = SetAppStatusACType | SetAppErrorACType | SetAppInitializedACType
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    iSInitialized: false // глобально апп добавили значение проинициализировано оно или нет
}

export type  RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая то глобальная произойдет - мы запишем текст ошибки сюда
    error: null | string
    //true если прил проинициализировалось( проверили юзера, получили персон настройки юзера, язык ..)
    iSInitialized: boolean
}
*/



