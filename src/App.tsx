import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValueType = "all" | "completed" | "active"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    let todoList1 = v1();
    let todoList2 = v1();

    let [todolists, setTodoLists] = useState<TodolistType[]>([
        {id: todoList1, title: "What to learn", filter: "all"},
        {id: todoList2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
    })

    // функции для тасок
    const addTAsk = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
    }

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id != id)})
    }

    function removeTodolist(todolistID: string) {
        setTodoLists(todolists.filter(tl => tl.id != todolistID))
        delete tasks[todolistID]
    }

    function changeFilter(todolistID: string, value: FilterValueType) {
        setTodoLists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    
    const changeTaskTitle = (todolistID: string, taskId: string, value: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(t =>t.id ===taskId ?{...t,title:value} :t)})
    }

    const changeTodolistTitle=(todolistID: string,value: string)=>{
        setTodoLists(todolists.map(tl =>tl.id===todolistID ?{...tl, title:value} : tl))
    }

    function addTodolist(title: string) {
        // создаем тудулист
        let newTodolist: TodolistType = {id: v1(), title: title, filter: "all"}
        setTodoLists([newTodolist, ...todolists])
        // создаем массив тасок для него
        setTasks({...tasks, [newTodolist.id]: []})
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((tl) => {
                let tasksForTodolist = tasks[tl.id]
                if (tl.filter === "completed") {
                    tasksForTodolist = tasks[tl.id].filter((t) => t.isDone)
                }
                if (tl.filter === "active") {
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
                        changeTaskStatus={changeStatus}
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


export default App;

