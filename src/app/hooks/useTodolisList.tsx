import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../store';
import React, {useCallback, useEffect} from 'react';
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
import {RequestStatusType} from '../app-reducer';
import { Navigate } from 'react-router-dom';

type PropsType = {
    //флаг для сторибука, чтобы не тянул данные с сервера, по умолчанию фолс. а в Сторибуке компонента с тру
    demo?: boolean
}

export const useTodolisList = ({demo = false}: PropsType) => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const dispatch: ThunkDispatch<AppRootStateType, any, any> = useDispatch()

    //было !demo. изм после инициализации
    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodolistTC())
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
        const action = changeTodolistFilterAC({id:todolistId,filter:value} );
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

// у Димыча это условие в компоненте, а не кастомном хуке. у него нет каст хука.
/*    if (!isLoggedIn) {
        return (<Navigate to="/" />)
    }*/

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
        demo,
        status
    }
}