
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsACType} from './todolists-reducer';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]:state[action.todolistId].filter(t=>t.id !=action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}}
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLIST': {
            //когда мы подгружает ТЛ с сервера, мы должны помимо Стейта ТЛ собрать, но надо и стейт Тасок собрать. мапим ТЛ и созд ассоц массив с ключом (= идТудулиста)
            const copyState = {...state};
            action.todolists.forEach(tl => {copyState[tl.id] = []})
            return copyState;
        }
        case 'SET-TASKS': {
            //когда получ массив тасок для ТЛ, кладем их в ассоц массив целиком по ключу Тл
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
}
//actions
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
//испр, передаем только целый объект Таск, который вернул АПИ
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId} as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.getTasksTodolist(todolistId)
        .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
}
export const removeTaskTC = (todolistId: string, taskId: string) =>
    async (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTaskTodolist(todolistId, taskId).then(res => dispatch(removeTaskAC(taskId, todolistId)))
    }
export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch<ActionsType>) => {
    todolistsAPI.createTaskTodolist(todolistId, title)
        .then(res => dispatch(addTaskAC(res.data.data.item)))

}

// санка имеет право диспачить в любой редьюсор и к стейту обращаться
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    async (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

        const state = getState()
        //нашли нужную такску и проверили что она существует( всегда в паре с файнд)
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        //подтягиваем все, но перезатираем только пришедшее свойство
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel
        }

        todolistsAPI.updateTaskTodolist(todolistId, taskId, apiModel)
            .then(res => dispatch(updateTaskAC(taskId, domainModel, todolistId)))
    }

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsACType
    | ReturnType<typeof setTasksAC>