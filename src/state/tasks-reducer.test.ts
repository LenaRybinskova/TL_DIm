import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    setTaskseAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../App/App';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';


let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: '1',
                title: 'CSS',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '2',
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: '3',
                title: 'React',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                todoListId: 'todolistId1'
            }
        ],
        'todolistId2': [
            {
                id: '1',
                title: 'bread',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '2',
                title: 'milk',
                status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: '3',
                title: 'tea',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                order: 0,
                addedDate: '',
                todoListId: 'todolistId2'
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
    expect(endState['todolistId2'].every(t => t.id != '2')).toBeTruthy();
});
test('correct task should be added to correct array', () => {
    const action = addTaskAC('juce', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
});
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', TaskStatuses.New, 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('2', 'yogurt', 'todolistId2');

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'][1].title).toBe('JS');
    expect(endState['todolistId2'][1].title).toBe('yogurt');
    expect(endState['todolistId2'][0].title).toBe('bread');
});
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist');

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2');
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2');

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState['todolistId2']).not.toBeDefined();
});

//thunk
test('empty arrays should be added when we set todolists', () => {
    const action = setTodolistsAC([
        {id: '1', title: 'title1', order: 0, addedDate: ''},
        {id: '2', title: 'title2', order: 0, addedDate: ''}]);

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});
test('tasks should be added to Todolist ', () => {

    const action = setTaskseAC('todolistId1', startState['todolistId1'])
    const endState = tasksReducer({['todolistId1']: [], ['todolistId2']: []}, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);
        expect(endState['todolistId1']).toBe(startState['todolistId1']);

});