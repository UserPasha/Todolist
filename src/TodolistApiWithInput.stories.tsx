import React, {ChangeEvent, useEffect, useState} from 'react'
import {todolistsApi} from "./api/todolists-api";

export default {
    title: 'TodolistAPIWithInput'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    const handleButton = () =>{
        todolistsApi.getTodolist().then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
    <button onClick={handleButton}>Show Todolists</button>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [value, setValue] = useState<string>("")

    const handleValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const handleButton = () => {
        todolistsApi.createTodolist(value).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <input type="text" value={value} placeholder='TITLE' onChange={handleValueInput}/>
        <button onClick={handleButton}>Create Todolist</button>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const handleButton = () => {
        todolistsApi.deleteTodolists(todolistId).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <input type="text" value={todolistId} placeholder='TODOLIST ID' onChange={handleInput}/>
        <button onClick={handleButton}>Delete Todolist</button>
    </div>

}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [value, setValue] = useState<string>("")
    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }
    const handleValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const handleButton = () => {
        todolistsApi.updateTodolist(todolistId, value).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input type="text" value={todolistId} placeholder='TODOLIST ID' onChange={handleInput}/>
            <input type="text" value={value} placeholder='NEW TITLE' onChange={handleValueInput}/>
            <button onClick={handleButton}>Update Todolist</button>
        </div>
    </div>
}