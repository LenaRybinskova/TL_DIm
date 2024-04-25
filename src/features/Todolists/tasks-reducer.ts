import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api';
import {
    AddTodolistActionType,
    clearDataACType,
    RemoveTodolistActionType,
    SetTodolistsACType
} from './todolists-reducer';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';
import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLIST': {
            //когда мы подгружает ТЛ с сервера, мы должны помимо Стейта ТЛ собрать, но надо и стейт Тасок собрать. мапим ТЛ и созд ассоц массив с ключом (= идТудулиста)
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case 'SET-TASKS': {
            //когда получ массив тасок для ТЛ, кладем их в ассоц массив целиком по ключу Тл
            return {...state, [action.todolistId]: action.tasks}
        }
        case 'CLEAR-DATA':
            return {}
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
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusACType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.getTasks(todolistId)
        .then(res => {
                dispatch(setTasksAC(todolistId, res.data.items))
                dispatch(setAppStatusAC('succeeded'))
            }
        )
}
// я делала зенг-кеч
export const removeTaskTC = (todolistId: string, taskId: string) =>
   (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                if(res.data.resultCode===0){
                    dispatch(removeTaskAC(taskId, todolistId))
                }
                else{
                    handleServerAppError(res.data,dispatch)
                }
            })
            .catch(error=>{
                handleServerNetworkError(error, dispatch)
            })
    }

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType | SetAppStatusACType | SetAppErrorACType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            //если нет ошибок-диспачим
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            }
            else {
                handleServerAppError(res.data,dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })

}

// санка имеет право диспачить в любой редьюсор и к стейту обращаться
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
        const state = getState()
        //нашли нужную такску и проверили что она существует( всегда в паре с файнд)
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...domainModel
        }
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data,dispatch)
                }
            }).catch(error => {
            handleServerNetworkError(error,dispatch)
        })
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
    | clearDataACType

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusACType | SetAppErrorACType>