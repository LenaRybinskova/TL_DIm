import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists-api';

//не я писала историю
export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    console.log(state)
    useEffect(() => {
            todolistsAPI.getTodolists()
                .then((res) => {
                    setState(res.data)
                })
        },
        [])

    const mappedTl = () => {
        console.log()
    }

    return <div>
        <div>заголовок: {JSON.stringify(mappedTl)}</div>

        <hr/>
        {JSON.stringify(state)}
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')

    /*    useEffect(() => {
            todolistsAPI.createTodolist('newTITLE').then((res) => {
                setState(res.data)
            })
        }, [])*/

    const onClickHandler = () => {
        todolistsAPI.createTodolist(title).then((res) => setState(res.data))
    }

    return <div>
        <div>
            <input placeholder={'введите название ТЛ'}
                   value={title}
                   onChange={(e) => (setTitle(e.currentTarget.value))}/>
            <button onClick={onClickHandler}>создать ТЛ</button>
        </div>
        ответ сервера:{JSON.stringify(state)}
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [idTL, setIdTL] = useState('')
    /*    useEffect(() => {
            const todolistId = '996f7d33-8d84-4889-b2af-0db1b8cd498a'
            todolistsAPI.deleteTodolist(todolistId).then((res) => {
                setState(res.data)
            })
        }, [])*/

    const onClickHandler = () => {
        todolistsAPI.deleteTodolist(idTL).then(res => setState(res.data))
    }


    return (
        <div>{JSON.stringify(state)}
            <div>
                <input placeholder={'id TL'} value={idTL} onChange={(e) => {
                    setIdTL(e.currentTarget.value)
                }}/>
                <button onClick={onClickHandler}>удалить</button>
            </div>
        </div>
    )
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [idTL, setIdTL] = useState<string>('')
    const [updTitle, setUpdTitle] = useState<string>('')

    /*    useEffect(() => {
            const todolistId = '0b5ec524-a23b-486b-9579-98cdbc337638'
            todolistsAPI.updateTodolist(todolistId, 'NewNewTitle').then((res) => {
                setState(res.data)
            })
        }, [])*/

    const onClickHandler = () => {
        todolistsAPI.updateTodolist(idTL, updTitle).then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'idTL'} value={idTL} onChange={e => setIdTL(e.currentTarget.value)}/>
            <input placeholder={'new title'} value={updTitle} onChange={e => setUpdTitle(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>изменить заголовок ТЛ</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [idTL, setIdTL] = useState('')

    /*    useEffect(() => {
            const todolistId = 'cf7d8e3e-d918-4159-9b82-8a4bc9645387'
            todolistsAPI.getTasksTodolist(todolistId)
                .then((res) => {
                    setState(res.data)
                })

        }, [])*/

    const onClickHanndler = () => {
        todolistsAPI.getTasks(idTL)
            .then((res) => {
                setState(res.data.items)
            })
    }

    return (
        <div>
            <input placeholder={'введите номер ТЛ'} onChange={e => setIdTL(e.currentTarget.value)} value={idTL}/>
            <button onClick={onClickHanndler}>show tasks</button>
            <hr/>
            {JSON.stringify(state)}
        </div>
    )
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [idTL, setIdTL] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')

    /*useEffect(() => {
        const todolistId = '0b5ec524-a23b-486b-9579-98cdbc337638'
        todolistsAPI.createTaskTodolist(todolistId, '222222222222222222222222222222222').then((res) => {
            setState(res.data)
        })
    }, [])*/

    const onClickHandler = () => {
        todolistsAPI.createTask(idTL, taskTitle).then(res => setState(res.data))
    }

    return <div>
        {JSON.stringify(state)}
        <input placeholder={'idTL'} value={idTL} onChange={e => setIdTL(e.currentTarget.value)}/>
        <input placeholder={'task title'} value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>create task</button>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [idTL, setIdTL] = useState('')
    const [idTask, setIdTask] = useState('')

    /*   useEffect(() => {
           const todolistId = '0b5ec524-a23b-486b-9579-98cdbc337638'
           const taskId = '100af61e-fb54-45cb-af11-e80406c87172'
           todolistsAPI.deleteTaskTodolist(todolistId, taskId).then((res) => {
               setState(res.data)
           })
       }, [])
   */
    //c63283b6-4bec-4bda-a166-efef13218baf
    const onClickHandler = () => {
        todolistsAPI.deleteTask(idTL, idTask).then((res) => {
            setState(res.data)
        })
    }

    //162a702f-d4af-4f81-a4ec-d4c3ef213096
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={'id TL'} value={idTL} onChange={e => setIdTL(e.currentTarget.value)}/>
            <input placeholder={'id task'} value={idTask} onChange={e => setIdTask(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>delete task</button>
        </div>
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [idTL, setIdTL] = useState('')
    const [idTask, setIdTask] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')


    /* useEffect(() => {
         const todolistId = 'cf7d8e3e-d918-4159-9b82-8a4bc9645387'
         const taskId = '154e6972-1111-43fa-8271-3cb836132281'
                 const model = {
                     title: 'ИЗМЕНИЛА ЗАГОЛОВОК111111',
                     description: null,
                     status: 0,
                     priority: 1,
                     startDate: null,
                     deadline: null
                 }
                 todolistsAPI.updateTaskTodolist(todolistId, taskId, model).then((res) => {
                     console.log(res.data)
                     setState(res.data)
                 })
             }, [])*/

    //cf7d8e3e-d918-4159-9b82-8a4bc9645387тл  9a39c322-11a7-4d7a-ae04-67e5fa0887c0таск

    const onClickHandler = () => {
        const model = {
            title: taskTitle,
            description: description,
            status: status,
            priority: priority,
            startDate: "",
            deadline: ""
        }
        todolistsAPI.updateTask(idTL, idTask, model).then((res) => setState(res.data))
    }
    return <div>
        <div><input placeholder={'id TL'} value={idTL} onChange={e => setIdTL(e.currentTarget.value)}/></div>
        <div><input placeholder={'id task'} value={idTask} onChange={e => setIdTask(e.currentTarget.value)}/></div>
        <div><input placeholder={'new title'} value={taskTitle} onChange={e => setTaskTitle(e.currentTarget.value)}/>
        </div>
        <div><input placeholder={'description'} value={description}
                    onChange={e => setDescription(e.currentTarget.value)}/></div>
        <div><input placeholder={'status'} value={status} type="number" onChange={e => setStatus(+e.currentTarget.value)}/></div>
        <div><input placeholder={'priority'} value={priority} type="number" onChange={e => setPriority(+e.currentTarget.value)}/></div>
        <div><input placeholder={'startDate'} value={startDate} onChange={e => setStartDate(e.currentTarget.value)}/>
        </div>
        <div><input placeholder={'deadline'} value={deadline} onChange={e => setDeadline(e.currentTarget.value)}/></div>

        <button onClick={onClickHandler}>update task title</button>
        <hr/>
        {JSON.stringify(state)}
    </div>
}
