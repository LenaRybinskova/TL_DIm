import React from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';


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
    changeTaskTitle: (todolistID: string, taskId: string, value: string) => void
    changeTodolistTitle: (todolistID: string, value: string) => void
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

    // функции - ОБЕРТКА -ПОРТ для спана конкретно для ТЛ, тк нам надо в эдТаск передать и айди и тайтл
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

// функции - ОБЕРТКА -ПОРТ для спана
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/></h3>
            <IconButton aria-label="delete" onClick={onButtonRemoveTodolistHandler}>
                <Delete/>
            </IconButton>

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
                        {/* функ обертка для спана с отредактир тайтлом */
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(props.id, el.id, newValue)
                        }
                        return (
                            <li key={el.id} className={el.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       checked={el.isDone}
                                       onChange={onChangeHandler}/>
                                <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                                <IconButton aria-label="delete" onClick={onClickHandler}>
                                    <Delete/>
                                </IconButton>
                            </li>)
                    }
                )
                }
            </ul>

            {/*3 кнопки фильтра*/}
            <div>
                {/*<Button  color={"inherit"} onClick={onAllClickHandler} className={props.filter === "all" ? "active-filter" : ""}>All</Button>*/}
                <Button color={"inherit"} onClick={onAllClickHandler}
                        className={props.filter === "all" ? "contained" : ""}>All</Button>
                <Button color={"primary"} onClick={onActiveClickHandler}
                        className={props.filter === "active" ? "contained" : ""}>Active
                </Button>
                <Button color={"secondary"} onClick={onCompletedClickHandler}
                        className={props.filter === "completed" ? "contained" : ""}>Completed
                </Button>
            </div>
        </div>

    )
}

