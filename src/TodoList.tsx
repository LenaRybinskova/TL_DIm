import React from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, id: string) => void
    changeFilter: (todolistID: string, value: FilterValueType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValueType
    removeTodolist: (todolistID: string) => void
}

export function TodoList(props: TodoListType) {

    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")
    const onButtonRemoveTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    // функции - ОБЕРТКА конкретно для ТЛ, тк нам надо в эдТаск передать и айди и тайтл
    const addTask = (title: string) => {
        props.addTask(props.id, title)
        console.log("props.id",props.id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={onButtonRemoveTodolistHandler}>x</button>

            {/*инпут универсальный*/}
            <AddItemForm addItem={addTask}/>

            {/* мапятся таски */}
            <ul>
                {props.tasks.map((el) => {
                        const onClickHandler = () => {
                            props.removeTask(props.id, el.id)
                        }
                        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, el.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={el.id} className={el.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={el.isDone}
                                       onChange={onChangeHandler}/><span>{el.title}</span>
                                <button onClick={onClickHandler}>x
                                </button>
                            </li>)
                    }
                )
                }
            </ul>
            {/*3 кнопки фильтра*/}
            <div>
                <button onClick={onAllClickHandler} className={props.filter === "all" ? "active-filter" : ""}>All
                </button>
                <button onClick={onActiveClickHandler}
                        className={props.filter === "active" ? "active-filter" : ""}>Active
                </button>
                <button onClick={onCompletedClickHandler}
                        className={props.filter === "completed" ? "active-filter" : ""}>Completed
                </button>
            </div>
        </div>

    )
}

