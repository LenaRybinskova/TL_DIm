import {v1} from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {useCallback} from 'react';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/tasks-reducer';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from '../../state/todolists-reducer';
import {FilterValuesType, TasksStateType, TodolistType} from '../AppWithRedux';

export const useAppWIthRedux=()=>{

    console.log('App вызвана')
    let todolistId1 = v1();
    let todolistId2 = v1();

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask=useCallback((id: string, todolistId: string) =>{
        const action = removeTaskAC(id, todolistId);
        dispatch(action);
    },[dispatch])

    const addTask=useCallback((title: string, todolistId: string)=> {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    },[dispatch])

    const changeStatus=useCallback((id: string, isDone: boolean, todolistId: string) =>{
        const action = changeTaskStatusAC(id, isDone, todolistId);
        dispatch(action);
    },[dispatch])

    const changeTaskTitle=useCallback((id: string, newTitle: string, todolistId: string)=>{
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatch(action);
    },[dispatch])

    const changeFilter=useCallback((value: FilterValuesType, todolistId: string)=>{
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    },[dispatch])

    const removeTodolist=useCallback((id: string)=> {
        const action = removeTodolistAC(id);
        dispatch(action);
    },[dispatch])

    const changeTodolistTitle=useCallback((id: string, title: string)=> {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    },[dispatch])

    //обернули в хук тк это коллбек компоненты AddItemForm
    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])


    return {todolists, addTodolist,tasks,removeTask,changeFilter,addTask,changeStatus,removeTodolist,changeTaskTitle,changeTodolistTitle}
}