import {setErrorAC, setStatusAC} from "../app/app-reducer";
import {ResponseType, TaskType} from '../api/todolists-api'
import { Dispatch } from "redux";
import {ThunkDispatch} from "../features/TodolistsList/tasks-reducer";


export const handleServerAppError = <D>(data: ResponseType<D>,  dispatch: Dispatch<ThunkDispatch>) =>{
    if (data.messages.length) {
        dispatch(setErrorAC(data.messages[0]))
        dispatch(setStatusAC("failed"))
}else{
        dispatch(setErrorAC("some error occurred"))
        dispatch(setStatusAC("failed"))
    }
}

export const handleNetworkAppError = (error: any,  dispatch: Dispatch<ThunkDispatch>)=>{
    dispatch(setErrorAC(error.message ? error.message : "some error occurred"))
    dispatch(setStatusAC("failed"))
}


