
import {useState} from 'react';
import {todolistId1, todolistId2} from '../id-utils';
import {v1} from 'uuid';
import {FilterValuesType, TodolistDomainType} from '../../state/todolists-reducer';

//кастомный хук
export function useTodolists(onTodolistRemove:(id:string)=>void, onTodolistAdded:(newTodolistId:string)=>void) {
    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate: "",
            order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all',addedDate: "",
        order: 0}
    ])

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        /*delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        setTasks({...tasks});*/
        //заменили на
        onTodolistRemove(id)
    }

    function changeTodolistTitle(id: string, title: string) {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistDomainType = {id: newTodolistId, title: title, filter: 'all',addedDate: "",
            order: 0};
        setTodolists([newTodolist, ...todolists]);
       /* setTasks({
            ...tasks,
            [newTodolistId]: []
        })*/
        //заменили на
        onTodolistAdded(newTodolistId)
    }

    return {todolists, changeFilter, removeTodolist,changeTodolistTitle,addTodolist}
}