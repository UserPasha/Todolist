import {FilterValuesType, TodolistType} from "./AppWithRedux";
import {v1} from "uuid";

const initState: Array<TodolistType> = []

export const todolistsReducer = (state=initState, action: todolistsReducerType): Array<TodolistType>=> {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter((el)=>el.id!==action.id)
        }
        case "ADD-TODOLIST":{
            let newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'};
            return [newTodolist, ...state ]
        }
        case "CHANGE-TODOLIST-TITLE":{
            return state.map((el)=>el.id===action.payload.id ? {...el,title:action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER":{

            return state.map((el)=>el.id===action.payload.id ? {...el,filter:action.payload.filter} : el)
        }
        default:
            return state
    }
}

type todolistsReducerType = removeTodolistACType| addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType
export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        id: todolistId
    } as const
}

export type addTodolistACType=ReturnType<typeof addTodolistAC>
export const addTodolistAC=(newTodolistTitle:string)=>{
    return{
        type: 'ADD-TODOLIST',

            title: newTodolistTitle,
            todolistId: v1()

    }as const
}

export type changeTodolistTitleACType=ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC=(todolistId:string,newTodolistTitle:string)=>{
    return{
        type: 'CHANGE-TODOLIST-TITLE',
        payload:{
            id: todolistId,
            title: newTodolistTitle
        }
    }as const
}

export type changeTodolistFilterACType=ReturnType<typeof changeTodolistFilterAC>
export  const changeTodolistFilterAC=(todolistId:string,newFilter:FilterValuesType)=>{
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        payload:{
            id: todolistId,
            filter: newFilter
        }
    }as const
}