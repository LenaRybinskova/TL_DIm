import {tasksReducer} from '../features/Todolists/tasks-reducer';
import {todolistsReducer} from '../features/Todolists/todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {thunk} from 'redux-thunk';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';


// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app:appReducer,
    auth:authReducer
})

// applyMiddleware функ из библ Redux
/*export const store = createStore(rootReducer,applyMiddleware(thunk) );*/
export const store = configureStore({
    reducer:rootReducer,
    //getDefaultMiddleware это дефолтные мидлверы. В новой версии можно middleware уже не указывать- под копотом
/*    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)*/
});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppDispatchType=typeof store.dispatch

export const useAppDispatch=()=>useDispatch<AppDispatchType>()
/*export const useAppDispatch: () => AppDispatchType = useDispatch;*/
/*export const useAppDispatch = useDispatch.withTypes<AppDispatchType>()*/
/*export const useAppDispatch=()=>useDispatch<AppDispatchType>()*/




// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
