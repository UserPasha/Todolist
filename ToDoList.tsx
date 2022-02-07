import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import ToDoListHeader from "./ToDoListHeader";
import Button from "./Button";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";


type ToDoListPropsType = {
    todolistsID: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (todolistsID:string, taskID: string) => void
    changeFilter: (todolistsID:string, ilter: FilterValuesType) => void
    addTask: (todolistsID:string, title: string) => void
    changeTaskStatus: (todolistsID:string, taskID: string, isDone: boolean) => void
   deleteTodolist:(todolistsID:string)=> void
    newTodolist: ()=> void
}

const ToDoList = (props: ToDoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    let taskComponents = props.tasks.map(t => {

        return(
            <Task
                key={t.id}
                id={t.id}
                title={t.title}
                isDone={t.isDone}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
                todolistsID={props.todolistsID}
            />
        )
    })
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const OnClickFilterAll = () => props.changeFilter(props.todolistsID, "all")
    const onClickFilterActive = () => props.changeFilter(props.todolistsID, "active")
    const onClickFilterCompleted = () => props.changeFilter(props.todolistsID, "completed")
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }  /*e.key === "Enter"&& onClickAddTask() - the same */
    }
    const onClickAddTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(props.todolistsID,trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    return (
        <div>
            <ToDoListHeader
                title={props.title}
                todolistsID={props.todolistsID}
               deleteTodolist={props.deleteTodolist}
                newTodolist={props.newTodolist}
            />
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}//input.value
                    onKeyPress={onKeyPressAddTask}
                    className={error? "error" : ""}
                />
                <button onClick={onClickAddTask}>+</button>
                {error && <div style={{color: "red"}}>Title is required!</div>} 
            </div>
            <ul>

                {taskComponents}

            </ul>
            <div>
                <Button
                    activeBC={props.filter === "all"}
                    title={"All"}
                    onClickCallBAck={OnClickFilterAll}/>
                <Button
                    activeBC={props.filter === "active"}
                    title={"Active"}
                    onClickCallBAck={onClickFilterActive}/>
                <Button
                    activeBC={props.filter === "completed"}
                    title={"Completed"}
                    onClickCallBAck={onClickFilterCompleted}/>


            </div>
        </div>

    );
}

export default ToDoList;