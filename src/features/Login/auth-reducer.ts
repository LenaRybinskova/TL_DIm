import {Dispatch} from 'redux';
import {setAppStatusAC} from '../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearDataAC} from '../Todolists/todolists-reducer';


const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        // приходит не сам state, а как бы его черновик(stateDraft) и мы его можем мутировать,
        // библ сделает все иммутабельно в итоге
        //это мы сделали case 'login/SET-IS-LOGGED-IN' и тут же АС к нему. Теперь setIsLoggedInAC -это не АС
        // а подредьюсор, на основ его ртк сама сосздаст АС
        setIsLoggedInAC(stateDraft, action: PayloadAction<{value:boolean}>) {
            stateDraft.isLoggedIn=action.payload.value
        }
    }
})
export const authReducer =slice.reducer
export const {setIsLoggedInAC}=slice.actions


//thunks
export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        authAPI.login(data).then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value:true})) //залогин
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
            handleServerNetworkError(error, dispatch)
        })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        authAPI.logout().then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value:false})) //вылогин
                dispatch(clearDataAC())
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
            handleServerNetworkError(error, dispatch)
        })
    }
}


/*export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            debugger
            return {...state, isLoggedIn: action.value}
        default:
            return state;
    }
}*/

/*//actions
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'login/SET-IS-LOGGED-IN',
        value
    } as const
}*/


//types
/*type InitialStateType = {
    isLoggedIn: boolean
}*/
/*export type SetIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>*/
/*type ActionsType = SetIsLoggedInACType*/

/*type ThunkDispatch = Dispatch<ActionsType | SetAppStatusACType | SetAppErrorACType>*/

