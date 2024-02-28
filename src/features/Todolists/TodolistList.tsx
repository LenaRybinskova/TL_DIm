import React from 'react';
import {useTodolisList} from '../../app/hooks/useTodolisList';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/Todolist';


type TodolistsListPropsType={
    demo?:boolean
}
const TodolistsList: React.FC<TodolistsListPropsType> = (props) => {

    const {todolists, addTodolist, tasks, removeTask, changeFilter, addTask, changeStatus, removeTodolist, changeTaskTitle, changeTodolistTitle,} =useTodolisList(props)

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm onItemAdded={addTodolist}/>
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