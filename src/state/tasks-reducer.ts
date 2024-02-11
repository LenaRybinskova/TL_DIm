import {TasksStateType} from '../App/App';
import {v1} from 'uuid';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI} from '../api/todolists-api';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsACType} from './todolists-reducer';
import {Dispatch} from 'redux';


type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type SetTasksACType = ReturnType<typeof setTaskseAC>

type ActionsType =
    ReturnType<typeof removeTaskAC>
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsACType
    | SetTasksACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: action.todolistId,
                order: 0,
                addedDate: '',
            }
            const tasks = stateCopy[action.todolistId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let task = todolistTasks.find(t => t.id === action.taskId);
            //изменим таску, если она нашлась
            if (task) {
                task.title = action.title;
            }
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        //когда мы подгружает ТЛ с сервера, мы должны помимо Стейта ТЛ собрать, но надо и стейт Тасок собрать. мапим ТЛ и созд ассоц массив с ключом (= идТудулиста)
        case 'SET-TODOLIST': {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        //когда получ массив тасок для ТЛ, кладем их в ассоц массив целиком по ключу Тл
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}


export const setTaskseAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const
}

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch:Dispatch) => {
        todolistsAPI.getTasksTodolist(todolistId)
            .then(res => dispatch(setTaskseAC(todolistId, res.data.items)))
    }
}

