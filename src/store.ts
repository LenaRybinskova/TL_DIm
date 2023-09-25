import {todolistsReducer} from './state/todolists-reducer';
import {tasksReducer} from './state/tasks-reducer';
import {combineReducers, createStore} from 'redux';


// это один главный редьюсер, в него приходят все экшены и диспатчи.
// Он кидает каждый экшен в каждый редьюсер.
// И каждый реьюсер прогоняет у себя экшен и возвращает стейт(либо измен либо нет)
// При инициализации рутовый редьюсер отпр во все редьюсеры неизвестный тайп и они возвращают просто стейт по дефолту
const rootReducer = combineReducers({
        todolists: todolistsReducer,
        tasks: tasksReducer
    }
)

export type RootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

// @ts-ignore это мы глоб объекту добавили свойство Стор, чтобы в консоли Ф12 смотреть быстро что в сторе
window.store=store