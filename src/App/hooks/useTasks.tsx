//кастомный хук
import {useState} from 'react';
import {todolistId1, todolistId2} from '../id-utils';
import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses} from '../../api/todolists-api';


export function useTasks() {
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",todoListId:todolistId1,order:0,addedDate:""},
            {id: v1(), title: 'JS',status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",todoListId:todolistId1,order:0,addedDate:""}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",todoListId:todolistId2,order:0,addedDate:""},
            {id: v1(), title: 'React Book', status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",todoListId:todolistId2,order:0,addedDate:""}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, status: TaskStatuses.New,description:"",priority:TaskPriorities.Low,startDate:"",deadline:"",todoListId:todolistId,order:0,addedDate:""};
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
        tasks[todolistId] = [task, ...todolistTasks];
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.status = status;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        let todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        let task = todolistTasks.find(t => t.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.title = newTitle;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function completelyRemoveTasksForTodolists(id:string){
        delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        setTasks({...tasks});
    }
    function createArrTasksForTodolists(newTodolistId:string){
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    return {tasks, removeTask, addTask, changeStatus, changeTaskTitle,
        completelyRemoveTasksForTodolists, createTaskForTodolists: createArrTasksForTodolists}
}