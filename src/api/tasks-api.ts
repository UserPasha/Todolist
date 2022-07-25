import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        "API-KEY": "65a1ac50-aed0-473a-9f3f-e49432f6ec64"
    }
})
export type Nullable<T = undefined> = T | null

export type TaskAPIType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Nullable<string>
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type getResponseType = {
    item: Array<TaskAPIType>
    totalCount: number
    error: Nullable<string>
}
// type postResponseType ={
//     resultCode: number
//     messages: Array<string>
//     data:{
//         items: TaskAPIType
//     }
// }

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export type updateTaskType = {
    //description: string
    title: string
    //status: number
    //priority: number
    //startDate: Nullable<string>
    // deadline: string
}

export const tasksApi = {
    getTask(TodolistId: string) {
        return instance.get<getResponseType>(`${TodolistId}/tasks`)
    },
    createTask(TodolistId: string, title: string) {
        return instance.post<ResponseType<{ items: TaskAPIType }>>(`${TodolistId}/tasks`, {title})
    },
    deleteTask(TodolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`${TodolistId}/tasks/${taskId}`)
    },
    updateTask(TodolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`${TodolistId}/tasks/${taskId}`, {title})
    }
}