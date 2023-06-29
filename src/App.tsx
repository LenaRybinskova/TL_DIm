import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";
import {v1} from "uuid";

export type FilterValueType = "all" | "completed" | "active"

type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    let todoList1 = v1();
    let todoList2 = v1();

    let [todolists, setTodoLists] = useState<TodolistType[]>([
        {id: todoList1, title: "What to learn", filter: "active"},
        {id: todoList2, title: "What to buy", filter: "active"}
    ])

    let [tasks, setTasks] = useState({
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

    const addTAsk = (todolistID: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
    }

    function removeTask(todolistID: string, id: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id != id)})
    }

    function removeTodolist(todolistID: string){
        setTodoLists(todolists.filter(tl =>tl.id!=todolistID))
        delete tasks[todolistID]
    }

    function changeFilter(todolistID: string, value: FilterValueType) {
        setTodoLists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    const changeStatus = (todolistID: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks,[todolistID]:tasks[todolistID].map(t =>t.id ===taskId? {...t,isDone}:t)})
    }

    return (
        <div className="App">
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

