import React from 'react';
import {TaskType} from "./App";

type TaskPropsType = TaskType & {
    removeTask: (taskID: number) => void
}


const Task = (props: TaskPropsType) => {
    const id = props.id
    const isDone = props.isDone
    const title = props.title
    const removeTask = props.removeTask
    return (

        <li><input type="checkbox" checked={isDone}/>
            <span>{title}</span>
            <button onClick={() => removeTask(id)}>X</button>
        </li>

    );
};

export default Task;