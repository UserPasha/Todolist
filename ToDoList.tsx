import React from 'react';
import ToDoListHeader from "./ToDoListHeader";
import Button from "./Button";
import {TaskType} from "./App";
import Task from "./Task";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
}


function ToDoList(props: ToDoListPropsType) {
    return (
        <div className="App">
            <div>
                <ToDoListHeader title={props.title}/>

                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <Task key={props.tasks[0].id}
                          {...props.tasks[0]}/>
                    <Task key={props.tasks[1].id}
                          {...props.tasks[1]}/>
                    <Task key={props.tasks[2].id}
                          {...props.tasks[2]}/>

                </ul>
                <div>
                    <Button title={"All"}/>
                    <Button title={"Active"}/>
                    <Button title={"Completed"}/>

                </div>
            </div>
        </div>
    );
}

export default ToDoList;