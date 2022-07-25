import React, {useEffect, useState} from 'react'
import {tasksApi, updateTaskType} from "./api/tasks-api";


export default {
    title: 'TasksAPI'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        const todolistId = "a664bd91-e6b6-4291-a804-f29b6080da0d"
        tasksApi.getTask(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "a664bd91-e6b6-4291-a804-f29b6080da0d"
        tasksApi.createTask(todolistId, 'Task').then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "a664bd91-e6b6-4291-a804-f29b6080da0d"
        const taskId = "4a3f2861-9788-4de4-bde1-41fe0656bdf8"
        tasksApi.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "a664bd91-e6b6-4291-a804-f29b6080da0d"
        const taskId = "2b4861f3-a388-4136-b5e8-03042da87118"
        tasksApi.updateTask(todolistId,taskId, "new Title").then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}