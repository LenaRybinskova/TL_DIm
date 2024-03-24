import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../app/app-reducer';
import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';

export const handleServerAppError = <D>(data:ResponseType<D>,dispatch:Dispatch<SetAppStatusACType | SetAppErrorACType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    }
    //если вообще никаких сообщений нет, выводим это свое
    else {
        dispatch(setAppErrorAC('some error accurred'))
    }
    // в любом случае стутс Апп меняется на фейл
    dispatch(setAppStatusAC('failed'))
    }

    //отловит, если нет инета
export const handleServerNetworkError=(error:{message:string}, dispatch:Dispatch<SetAppStatusACType | SetAppErrorACType>)=>{
    dispatch(setAppErrorAC(error.message? error.message:'some error occured, CATCH')) // показатель польз ошибку
    dispatch(setAppStatusAC('failed')) // откл общую крутилку
}
