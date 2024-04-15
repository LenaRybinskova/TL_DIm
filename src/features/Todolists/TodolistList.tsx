import React from 'react';
import {useTodolisList} from '../../app/hooks/useTodolisList';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';



type TodolistsListPropsType={
    demo?:boolean
}
const TodolistsList: React.FC<TodolistsListPropsType> = (props) => {
/*debugger*/
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const {todolists, addTodolist, tasks, removeTask, changeFilter, addTask, changeStatus, removeTodolist, changeTaskTitle, changeTodolistTitle,status} =useTodolisList(props)

    //не залогинен? редирект на логин
    if (!isLoggedIn) {
        return (<Navigate to="/login" />)
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm onItemAdded={addTodolist} disabled={status==="loading"}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    todolist={tl}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={props.demo}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>

    )
}

export default TodolistsList