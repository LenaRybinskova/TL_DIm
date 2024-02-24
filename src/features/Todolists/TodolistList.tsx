import React from 'react';
import {useAppWIthRedux} from '../../app/hooks/useAppWithRedux';
import {Grid, Paper} from '@mui/material';
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Todolist} from './Todolist/TodoList';

type TodolistsListPropsType = {}
const TodolistsList: React.FC<TodolistsListPropsType> = (props) => {

    const {
        todolists,
        addTodolist,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeStatus,
        removeTodolist,
        changeTaskTitle,
        changeTodolistTitle
    } = useAppWIthRedux()

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];
                        let tasksForTodolist = allTodolistTasks;

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
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