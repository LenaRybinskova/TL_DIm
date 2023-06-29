import React, {KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";


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
    const [newTAskTitle, setNewTAskTitle] = useState("")
    const [error, setError] = useState<string | null>(null) // или можно " " вместо налл

    const addTask = () => {
        if (newTAskTitle.trim() !== "" && newTAskTitle !== "kakashka") {
            props.addTask(props.id, newTAskTitle.trim())
            setNewTAskTitle("")
        } else {
            setError("title is required")
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTAskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // при вводе в инпут сразу обнул стейт по ошибке и строка с сообщением об ошибке должна уйти
        setError(null)
        if (e.key === "Enter") {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")

    const onButtonRemoveTodolistHandler = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={onButtonRemoveTodolistHandler}>x</button>

            <div>
                <input value={newTAskTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((el) => {

                        const onClickHandler = () => {
                            props.removeTask(props.id, el.id)
                        }

                        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.id, el.id, e.currentTarget.checked)
                        }

                        // для кажд чекбокса функ для онЧенч будет своя
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