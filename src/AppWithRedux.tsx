import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from './store/store';

export type FilterValueType = 'all' | 'completed' | 'active'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {

    const todolists = useSelector<RootStateType, TodolistType[]>(state => state.todolists) // выбираем из глоб стейта (AppRootState) нужную нам часть (TodolistType)
    const tasks = useSelector<RootStateType, TasksStateType>(state => state.tasks) // выбираем из глоб стейта (AppRootState) нужную нам часть с таксками
    const dispatch = useDispatch() // эта функ заменяет отдельные диспатчи кот были из юзРедьюсора. Она из библ Реакт-Редакс

    /*    let todoList1 = v1();
        let todoList2 = v1();

        let [todolists, dispatchTodoLists] = useReducer(todolistsReducer,[
            {id: todoList1, title: "What to learn", filter: "all"},
            {id: todoList2, title: "What to buy", filter: "all"}
        ])*/
    /*    let [todolists, setTodoLists] = useState<TodolistType[]>([
            {id: todoList1, title: "What to learn", filter: "all"},
            {id: todoList2, title: "What to buy", filter: "all"}
        ])*/

    /*let [tasks, setTasks] = useState<TasksStateType>({
        [todoList1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todoList2]: [
            {id: v1(), title: "milk", isDone: true},
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "cheese", isDone: false}
        ]
    })*/
/*    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoList1]: [
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoList2]: [
            {id: v1(), title: 'milk', isDone: true},
            {id: v1(), title: 'bread', isDone: true},
            {id: v1(), title: 'cheese', isDone: false}
        ]
    })*/

    // функции для тасок
    const addTAsk = (todolistID: string, title: string) => {
        dispatch(addTaskAC(title, todolistID))
/*        dispatchTasks(addTaskAC(title, todolistID))*/
        /*        let newTask = {id: v1(), title: title, isDone: false}
                setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})*/
    }

    function removeTask(todolistID: string, id: string) {
        dispatch(removeTaskAC(id, todolistID))
/*        dispatchTasks(removeTaskAC(id, todolistID))*/
        /*        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id != id)})*/
    }

    const changeTaskStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todolistID))
/*        dispatchTasks(changeTaskStatusAC(taskId, isDone, todolistID))*/
        /*setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})*/
    }

    const changeTaskTitle = (todolistID: string, taskId: string, value: string) => {
        dispatch(changeTaskTitleAC(value, taskId, todolistID))
/*        dispatchTasks(changeTaskTitleAC(value, taskId, todolistID))*/
        /*        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t =>t.id ===taskId ?{...t,title:value} :t)})*/
    }


// для тудулистов
    function removeTodolist(todolistID: string) {
        const action = removeTodolistAC(todolistID)
        dispatch(action)
/*        dispatchTodoLists(action)
        dispatchTasks(action)*/
        /*        setTodoLists(todolists.filter(tl => tl.id != todolistID))
                delete tasks[todolistID]*/
    }

    function changeFilter(todolistID: string, value: FilterValueType) {
        dispatch(changeTodolistFilterAC(todolistID, value))
/*        dispatchTodoLists(changeTodolistFilterAC(todolistID, value))*/
        /*        setTodoLists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))*/
    }


    const changeTodolistTitle = (todolistID: string, value: string) => {
        dispatch(changeTodolistTitleAC(todolistID, value))
/*        dispatchTodoLists(changeTodolistTitleAC(todolistID, value))*/
        /* setTodoLists(todolists.map(tl =>tl.id===todolistID ?{...tl, title:value} : tl))*/
        /* setTodoLists(todolists.map(tl =>tl.id===todolistID ?{...tl, title:value} : tl))*/
    }

    function addTodolist(title: string) {
        const action = addTodolistAC(title)
        dispatch(action)
/*
        dispatchTodoLists(action)
        dispatchTasks(action)*/
        /*        // создаем тудулист
                let newTodolist: TodolistType = {id: v1(), title: title, filter: "all"}
                setTodoLists([newTodolist, ...todolists])
                // создаем массив тасок для него
                setTasks({...tasks, [newTodolist.id]: []})*/
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasks[tl.id].filter((t) => t.isDone)
                }
                if (tl.filter === 'active') {
                    tasksForTodolist = tasks[tl.id].filter((t) => !t.isDone)
                }
                return (

                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTAsk}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}

                    />
                )
            })
            }

        </div>
    );
}


export default AppWithRedux;

