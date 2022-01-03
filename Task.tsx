import React from 'react';
import {TaskType} from "./App";


const Task = (props: TaskType) => {
    const id = props.id
    const isDone = props.isDone
    const title = props.title

    return (

            <li ><input type="checkbox" checked={isDone}/> <span>{title}</span></li>

    );
};

export default Task;