import React, {useReducer} from 'react';
import '../../app/App.css';
import {v1} from 'uuid';
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from '../../features/Todolists/todolists-reducer';
import {addTaskAC, removeTaskAC, tasksReducer} from '../../features/Todolists/tasks-reducer';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {Todolist} from '../../features/Todolists/Todolist/TodoList';
import {TaskPriorities, TaskStatuses, TaskType} from '../../api/todolists-api';

type FilterValuesType = "all" | "active" | "completed";


type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate:"", order:0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate:"", order:0}
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",order:0,addedDate:"",todoListId:"todolistId1"},
            {id: v1(), title: "JS", status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",order:0,addedDate:"",todoListId:"todolistId1"}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",order:0,addedDate:"",todoListId:"todolistId1"},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",order:0,addedDate:"",todoListId:"todolistId1"}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatchToTasks(action);
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC({id: "id-exist", title: title, status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",order:0,addedDate:"",todoListId:todolistId});
        dispatchToTasks(action);
    }

/*    function changeStatus(id: string, status:TaskStatuses, todolistId: string) {
        const action = updateTaskAC(id, status, todolistId);
        dispatchToTasks(action);
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatchToTasks(action);
    }*/

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatchToTodolists(action);
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatchToTasks(action);
        dispatchToTodolists(action);
    }

    function changeTodolistTitle(id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatchToTodolists(action);
    }

    function addTodolist(title: string) {
        const action = addTodolistAC({id: v1(), title: title, addedDate:"", order:0});
        dispatchToTasks(action);
        dispatchToTodolists(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
    {/*                                <Todolist
                                        key={tl.id}
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
                                    />*/}
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
