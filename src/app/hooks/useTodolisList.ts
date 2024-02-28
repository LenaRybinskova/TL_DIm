import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../store';
import {useCallback, useEffect} from 'react';
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from '../../features/Todolists/tasks-reducer';
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from '../../features/Todolists/todolists-reducer';
import {TaskStatuses} from '../../api/todolists-api';
import {ThunkDispatch} from 'redux-thunk';

type PropsType = {
    //флаг для сторибука, чтобы не тянул данные с сервера, по умолчанию фолс. а в Сторибуке компонента с тру
    demo?:boolean
}

export const useTodolisList = ({demo=false}:PropsType) => {

    console.log('App вызвана')

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch: ThunkDispatch<AppRootStateType, any, any> = useDispatch()

    useEffect(() => {
        if(!demo){
            dispatch(fetchTodolistTC())
        }
        else{ return }

    }, [])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        /*        const action = changeTaskStatusAC(id, status, todolistId);*/
        dispatch(updateTaskTC(id, {status: status}, todolistId));
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId));
    }, [dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskTC(todolistId, id))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskTC(todolistId, title))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        /*        const action = removeTodolistAC(id);*/
        dispatch(removeTodolistTC(id));
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        /*        const action = changeTodolistTitleAC(id, title);*/
        dispatch(changeTodolistTitleTC(id, title));
    }, [dispatch])

    //обернули в хук тк это коллбек компоненты AddItemForm
    const addTodolist = useCallback((title: string) => {
        /*        const action = addTodolistAC(title);*/
        dispatch(addTodolistTC(title));
    }, [dispatch])


    return {
        todolists,
        addTodolist,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeStatus,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle,
        demo
    }
}