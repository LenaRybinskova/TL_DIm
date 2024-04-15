import {Dispatch} from 'redux';
import {SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state;
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}
export const setLogoutAC = () => {
    return {
        type: 'login/SET-LOGOUT',
    } as const
}

//thunks
export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch<ActionsType | SetAppStatusACType | SetAppErrorACType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true)) //залогин
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
            handleServerNetworkError(error, dispatch)
        })
    }
}


export const logoutTC=()=>{
    return (dispatch:Dispatch<ActionsType | SetAppStatusACType | SetAppErrorACType>)=>{
        dispatch(setAppStatusAC('loading'))
        authAPI.logout().then(res =>{
            if(res.data.resultCode===0){
                dispatch(setIsLoggedInAC(false)) //вылогин
                dispatch(setAppStatusAC('succeeded'))
            } else{
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error=>{
            handleServerNetworkError(error, dispatch)
        })
    }
}

//types
type InitialStateType = {
    isLoggedIn: boolean
}
export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
type ActionsType = SetIsLoggedInACType

/*
type ThunkDispatch = Dispatch<ActionsType | SetAppStatusACType | SetAppErrorACType>
*/

