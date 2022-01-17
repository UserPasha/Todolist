import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import ToDoListHeader from "./ToDoListHeader";
import Button from "./Button";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";


type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const ToDoList = (props: ToDoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    //const taskComponents = props.tasks.map(t => <Task key={t.id} {...t}/>)
    const taskComponents = props.tasks.map(t => {
        return (
            <Task
                key={t.id}
                id={t.id}
                title={t.title}
                isDone={t.isDone}
                removeTask={props.removeTask}
            />
//  or that syntax's:
// <Task
//        key={t.id}
//        {...t}/>

        )
    })
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const OnClickFilterAll = () => props.changeFilter("all")
    const onClickFilterActive =() => props.changeFilter("active")
    const onClickFilterCompleted = () => props.changeFilter("completed")
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }  /*e.key === "Enter"&& onClickAddTask() - the same */
    }
    const onClickAddTask = () => {
        props.addTask(title)
        setTitle("")
    }
    return (
        <div>
            <ToDoListHeader title={props.title}/>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}//input.value
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>

                {taskComponents}

                {/* <Task key={props.tasks[0].id}
                      {...props.tasks[0]}/>
                <Task key={props.tasks[1].id}
                      {...props.tasks[1]}/>
                <Task key={props.tasks[2].id}
                      {...props.tasks[2]}/>*/}

            </ul>
            <div>
                <Button title={"All"}
                        onClickCallBAck={OnClickFilterAll}/>
                <Button title={"Active"}
                        onClickCallBAck={onClickFilterActive}/>
                <Button title={"Completed"}
                        onClickCallBAck={onClickFilterCompleted}/>


            </div>
        </div>

    );
}

export default ToDoList;