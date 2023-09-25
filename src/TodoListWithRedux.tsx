import React from 'react';
import {FilterValueType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import {TasksStateType, TodolistType} from './AppWithRedux';
import {useDispatch, useSelector} from 'react-redux';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './state/todolists-reducer';
import {RootStateType} from './store';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}


export function TodoListWithRedux(props: PropsType) {
    const dispatch = useDispatch()

    const {id, title, filter} = props.todolist // в компон передали объект Тудулист , деструктуризировали его на переменные

    let tasks = useSelector<RootStateType, TaskType[]>(state => state.tasks[id])


    if (filter === 'completed') {
        tasks = tasks.filter((t) => t.isDone)
    }
    if (filter === 'active') {
        tasks = tasks.filter((t) => !t.isDone)
    }


    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, 'all'))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, 'active'))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, 'completed'))

    //удалить Тудулист
    const onButtonRemoveTodolistHandler = () => {
        dispatch(removeTodolistAC(id))
    }

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

// функции - ОБЕРТКА -ПОРТ для спана
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(title, id))
    }

    return (
        <div>
            <h3><EditableSpan title={title} onChange={changeTodolistTitle}/></h3>
            <IconButton aria-label="delete" onClick={onButtonRemoveTodolistHandler}><Delete/></IconButton>

            {/*инпут универсальный*/}
            <AddItemForm addItem={addTask}/>

            {/* мапятся таски */}
            <ul>
                {tasks.map((el) => {
                        const onClickHandler = () => {
                            dispatch(removeTaskAC(el.id,id ))
                        }
                        const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeTaskStatusAC(el.id, e.currentTarget.checked, id))
                        }
                        {/* функ обертка для спана с отредактир тайтлом */
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            dispatch(changeTaskTitleAC(newValue, el.id, id))
                        }
                        return (
                            <li key={el.id} className={el.isDone ? 'is-done' : ''}>
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
                <Button color={'inherit'} onClick={onAllClickHandler}
                        className={filter === 'all' ? 'contained' : ''}>All</Button>
                <Button color={'primary'} onClick={onActiveClickHandler}
                        className={filter === 'active' ? 'contained' : ''}>Active
                </Button>
                <Button color={'secondary'} onClick={onCompletedClickHandler}
                        className={filter === 'completed' ? 'contained' : ''}>Completed
                </Button>
            </div>
        </div>

    )
}

