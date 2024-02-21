import axios from 'axios';


// withCredentials: true означает, что включена передача куков


const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': ''
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
});


export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}
type GetTaskResponseType = {
    error: string | null,
    totalCount: number,
    items: TaskType[]
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi,
    Ungently,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string | null
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}


export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType<{ item: {} }>>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType<{ item: {} }>>(`todo-lists/${id}`, {title: title})
    },
    getTasksTodolist(todolistId: string) {
        const promise = instance.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
        return promise
    },
    deleteTaskTodolist(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },
    createTaskTodolist(todolistId: string, title: string) {
        const promise = instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: title})
        return promise
    },
    updateTaskTodolist(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const promise = instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    },
}





