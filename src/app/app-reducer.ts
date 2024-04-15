import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC, SetIsLoggedInACType} from '../features/Login/auth-reducer';

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
export const initializedAppTC = () => {
    return (dispatch: Dispatch<ActionsType>) => {
        authAPI.me().then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true)) //залогинены
            } else {
            }
            dispatch(setAppInitializedAC(true)) //проиниц
        })
    }
}

///types
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppInitializedACType = ReturnType<typeof setAppInitializedAC>

type ActionsType = SetAppStatusACType | SetAppErrorACType | SetAppInitializedACType | SetIsLoggedInACType
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

