
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return {...state}
    }
}

//action

export const setStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}
export const setErrorAC = (error: string | null) => {
    return {
        type: 'APP/SET-ERROR', error
    } as const
}


//thunk


///types
export type SetErrorACType=ReturnType<typeof setErrorAC>
export type SetStatusACType=ReturnType<typeof setStatusAC>
type ActionsType = SetStatusACType | SetErrorACType
const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export type  RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая то глобальная произойдет - мы запишем текст ошибки сюда
    error: null | string
}

