import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {
        "API-KEY": "65a1ac50-aed0-473a-9f3f-e49432f6ec64"
    }
})

export type TodolistAPIType = {
    id: string
    title: string
    addedDate: string
    order: number
}

//  type  createTodolistResponseType = {
//     resultCode: number
//     messages: Array<string>
//     data: {
//         item: TodolistAPIType
//     }
// }
//
// type deleteTodolistType = {
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }
// type updateTodolistType = {
//     resultCode: number
//     messages: Array<string>
//     data: {}
// }

type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    data: D
}


export const todolistsApi = {
    getTodolist() {
        return instance.get<Array<TodolistAPIType>>("")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistAPIType }>>("", {title})
    },
    deleteTodolists(todolistId: string){
        return instance.delete<ResponseType<{}>>(`/${todolistId}`)
    },
    //  BEFORE REFACTOR:

    // updateTodolist(todolistId: string, title: string){
    //     const promise = axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,{title},settings
    //     )
    //     return promise
    // }

    //  AFTER REFACTOR:
    updateTodolist(todolistId: string, title: string){
        return instance.put<ResponseType<{}>>(`/${todolistId}`,{title})

    }
}


