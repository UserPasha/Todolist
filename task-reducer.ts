import {FilterValuesType, TasksStateType, TodolistType} from "./App";
import {v1} from "uuid";
import {addTodolistACType, removeTodolistACType} from "./todolists-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    TaskID: string
    TodolistID: string
}
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeStatusActionType
    | changeTaskTitleAC
    | addTodolistACType
    | removeTodolistACType

const initState: TasksStateType = {}

export const taskReducer = (state = initState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.TodolistID]: state[action.TodolistID].filter(t => t.id !== action.TaskID)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.TodolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.TodolistID]]
            }
        }
        case 'CHANGE-STATUS': {
            return {
                ...state,
                [action.TodolistID]: state[action.TodolistID].map(m => m.id === action.id ? {
                    ...m,
                    isDone: action.isDone
                } : m)
            }
        }
        case "CHANGE-TITLE": {
            return {
                ...state,
                [action.TodolistID]: state[action.TodolistID].map(m => m.id === action.id ? {
                    ...m,
                    title: action.title
                } : m)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let newState = {...state}
            delete newState[action.id]
            return newState

        }
        default:
            return state
    }
}

export const removeTaskAC = (TaskID: string, TodolistID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK', TaskID, TodolistID
    }

}
export const addTaskAC = (title: string, TodolistID: string) => {
    return {
        type: 'ADD-TASK', title, TodolistID
    } as const
}
export const changeTaskStatusAC = (id: string, isDone: boolean, TodolistID: string) => {
    return {
        type: 'CHANGE-STATUS', id, isDone, TodolistID
    } as const
}
export const changeTaskTitleAC = (id: string, title: string, TodolistID: string) => {
    return {
        type: 'CHANGE-TITLE', id, title, TodolistID
    } as const
}

//знания(теория)=> умения(практика)=> навык(skills)