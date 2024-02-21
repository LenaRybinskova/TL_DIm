import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from '../state/tasks-reducer';
import {todolistsReducer} from '../state/todolists-reducer';
import {v1} from 'uuid';
import {AppRootStateType} from '../state/store';
import {todolistId1, todolistId2} from '../App/id-utils';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';

// заново как бы создаем стор, конкретно для сторибук
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate: "",
            order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all',addedDate: "",
            order: 0}
    ],
    tasks:{
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",todoListId:todolistId1,order:0,addedDate:""},
            {id: v1(), title: 'JS',status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",todoListId:todolistId1,order:0,addedDate:""}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",todoListId:todolistId2,order:0,addedDate:""},
            {id: v1(), title: 'React Book', status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",todoListId:todolistId2,order:0,addedDate:""}
        ]
    }
}

export const storyBookStore = createStore(rootReducer,initialGlobalState as AppRootStateType);

// for decorator
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}