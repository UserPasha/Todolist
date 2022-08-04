import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {Dispatch} from 'redux'
import {
    RequestStatusType,
    setErrorAC,
    SetErrorActionType,
    setStatusAC,
    SetStatusActionType
} from "../../app/app-reducer";
import {AxiosError} from "axios";


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        case "APP/CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        default:
            return state
    }
}

// actions
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({
    type: 'APP/CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    status
} as const)

export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)

// thunks
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch<ThunkDispatch>) => {
        dispatch(setStatusAC("loading"))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC("succeeded"))
            })
            .catch((error) => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC("failed"))
            })
    }
}

enum ResultCode {
    SUCCESFUL = 0,
    BAD_RESPONCE = 1,
    WRONG_CAPTCHA = 10
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<ThunkDispatch>) => {
        dispatch(setStatusAC("loading"))
        dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setStatusAC("succeeded"))
            })
            .catch((error: AxiosError) => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC("failed"))
            })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ThunkDispatch>) => {
        dispatch(setStatusAC("loading"))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setStatusAC("succeeded"))
            })
            .catch((error: AxiosError) => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC("failed"))
            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch<ThunkDispatch>) => {
        dispatch(setStatusAC("loading"))
        todolistsAPI.updateTodolist(id, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setStatusAC("succeeded"))
            })
            .catch((error: AxiosError) => {
                dispatch(setErrorAC(error.message))
                dispatch(setStatusAC("failed"))
            })
    }
}

// types
type ThunkDispatch = ActionsType | SetErrorActionType | SetStatusActionType

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
