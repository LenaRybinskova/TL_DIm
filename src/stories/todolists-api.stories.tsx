import React, {useEffect, useState} from 'react'
import {todolistsAPI} from '../api/todolists-api';

//не я писала историю
export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
            todolistsAPI.getTodolists()
                .then((res) => {
                    setState(res.data)
                })
        },
        [])

    return <div>
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
    useEffect(() => {
        const todolistId = '996f7d33-8d84-4889-b2af-0db1b8cd498a'
        todolistsAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0b5ec524-a23b-486b-9579-98cdbc337638'
        todolistsAPI.updateTodolist(todolistId, 'NewNewTitle').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0b5ec524-a23b-486b-9579-98cdbc337638'
        todolistsAPI.getTasksTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0b5ec524-a23b-486b-9579-98cdbc337638'
        todolistsAPI.createTaskTodolist(todolistId, '222222222222222222222222222222222').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '0b5ec524-a23b-486b-9579-98cdbc337638'
        const taskId = '100af61e-fb54-45cb-af11-e80406c87172'
        todolistsAPI.deleteTaskTodolist(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '0b5ec524-a23b-486b-9579-98cdbc337638'
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
    }, [])

    return <div>{JSON.stringify(state)}</div>
}