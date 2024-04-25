import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {Button, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/todolists-api';
import {FilterValuesType, TodolistDomainType} from '../todolists-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../../../app/store';
import {useDispatch} from 'react-redux';
import {fetchTasksTC} from '../tasks-reducer';


type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    //флаг для сторибука, чтобы не тянул данные с сервера
    demo?: boolean

}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {

    const dispatch: ThunkDispatch<AppRootStateType, any, any> = useDispatch()

    useEffect(() => {
        //чтобы Storybook не тянул данные с сервера. если demo тру - выкинет ию юзЭфф. если фолс-пойдет за данными
        if (demo) {
            return
        } else {
            /*     dispatch(fetchTasksTC(props.todolist.id)) закоммент, тк нет послед-ти четкой: сначала фетч ТЛ. потом фетч тасок.*/
        }
    }, [])

    //обернули в хук тк это коллбек компоненты AddItemForm
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id);
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id);
    }

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title);
    }, [props.changeTodolistTitle, props.todolist.id])

    // тоже обернули useCallBack тк под копотом компоненты кнопок(MUI) c React.memo
    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todolist.id), [props.changeFilter, props.todolist.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.todolist.id), [props.changeFilter, props.todolist.id])

    let tasksForTodolist = props.tasks
    if (props.todolist.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle}
                          disabled={props.todolist.entityStatus === 'loading'}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm onItemAdded={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task key={t.id} todolistId={props.todolist.id} task={t}
                                                removeTask={props.removeTask}
                                                changeTaskStatus={props.changeTaskStatus}
                                                changeTaskTitle={props.changeTaskTitle}/>)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


