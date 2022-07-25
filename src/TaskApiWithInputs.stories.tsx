import React, {ChangeEvent, useEffect, useState} from 'react'
import {Nullable, tasksApi, updateTaskType} from "./api/tasks-api";


export default {
    title: 'TasksAPIWithInputs'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const handleButton = () => {
        tasksApi.getTask(todolistId).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <input type='text' value={todolistId} placeholder='TODOLIST ID' onChange={handleInput}/>
        <button onClick={handleButton}>Show Tasks</button>
    </div>
}
export const CreateTask = () => {
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
        tasksApi.createTask(todolistId, value).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <input type='text' value={todolistId} placeholder='TODOLIST ID' onChange={handleInput}/>
        <input type='text' value={value} placeholder='NEW TITLE' onChange={handleValueInput}/>
        <button onClick={handleButton}>Create Task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const handleTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const handleButton = () => {
        tasksApi.deleteTask(todolistId, taskId).then((res) => {
            setState(res.data)
        })
    }

    return <div>{JSON.stringify(state)}
        <input type='text' value={todolistId} placeholder='TODOLIST ID' onChange={handleInput}/>
        <input type='text' value={taskId} placeholder='TASK ID' onChange={handleTaskInput}/>
        <button onClick={handleButton}>Delete Task</button>
    </div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>("")
    const [taskId, setTaskId] = useState<string>("")
    const [value, setValue] = useState<string>("")
    //  const [description, setDescription] = useState<string>("")
    //  const [status, setStatus] = useState<number>(0)
    //  const [priority, setPriority] = useState<number>(0)

    const handleTodoInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTodolistId(e.currentTarget.value)
    }

    const handleTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskId(e.currentTarget.value)
    }

    const handleValueInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    // const handleDescriptionInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     setDescription(e.currentTarget.value)
    // }
    //
    // const handleStatusInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     setStatus(+e.currentTarget.value)
    // }
    //
    // const handlePriorityInput = (e: ChangeEvent<HTMLInputElement>) => {
    //     setPriority(+e.currentTarget.value)
    // }
    const handleButton = () => {
        tasksApi.updateTask(todolistId, taskId, value).then((res) => {

            setState(res.data)
        })
    }


    return <div>{JSON.stringify(state)}
        <input type='text' value={todolistId} placeholder='TODOLIST ID' onChange={handleTodoInput}/>
        <input type='text' value={taskId} placeholder='TASK ID' onChange={handleTaskInput}/>
        <input type='text' value={value} placeholder='NEW TITLE' onChange={handleValueInput}/>
        {/*<input type='text' value={description} placeholder='description' onChange={handleDescriptionInput}/>*/}
        {/*<input type='number' value={status} placeholder='status' onChange={handleStatusInput}/>*/}
        {/*<input type='number' value={priority} placeholder='priority' onChange={handlePriorityInput}/>*/}
        <button onClick={handleButton}>UpdateTask</button>
    </div>
}