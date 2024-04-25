import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    TodolistType,
    UpdateTaskModelType
} from '../../api/todolists-api';
import {
    addTodolistAC,
    AddTodolistActionType,
    removeTodolistAC,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsACType
} from './todolists-reducer';
import {Dispatch} from 'redux';
import {AppRootStateType} from '../../app/store';
import {SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from '../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';



const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        },
        updateTaskAC: (state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC: (state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
            state[action.payload.todolistId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        //action типиз не надо, тк редакс и так знает типиз addTodolistAC
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: TodolistType) => {
                state[tl.id] = []
            })
        })
    }
})

export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions



//thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTasks(todolistId)
        .then(res => {
                dispatch(setTasksAC({todolistId: todolistId, tasks:res.data.items}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
}
// я делала зенг-кеч
export const removeTaskTC = (todolistId: string, taskId: string) =>
    (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC({taskId:taskId,todolistId:todolistId}, ))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            //если нет ошибок-диспачим
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task:res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })

}

// санка имеет право диспачить в любой редьюсор и к стейту обращаться
export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId:taskId,model: domainModel,todolistId:todolistId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }).catch(error => {
            handleServerNetworkError(error, dispatch)
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


type ThunkDispatch = Dispatch< SetAppStatusACType | SetAppErrorACType>


/*export const _tasksReducer = (state: TasksStateType = initialState, action: any): TasksStateType => {
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
        case addTodolistAC.type: {
            return {...state, [action.payload.todolist.id]: []}
        }
        case removeTodolistAC.type: {
            const copyState = {...state};
            delete copyState[action.payload.id];
            return copyState;
        }
        case setTodolistsAC.type: {
            //когда мы подгружает ТЛ с сервера, мы должны помимо Стейта ТЛ собрать, но надо и стейт Тасок собрать. мапим ТЛ и созд ассоц массив с ключом (= идТудулиста)
            const copyState = {...state};
            action.payload.todolists.forEach((tl: TodolistType) => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case 'SET-TASKS': {
            //когда получ массив тасок для ТЛ, кладем их в ассоц массив целиком по ключу Тл
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
}*/
/*
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
*/