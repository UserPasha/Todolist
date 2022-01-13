import React from 'react';
import ToDoListHeader from "./ToDoListHeader";
import Button from "./Button";
import {FilterValuesType, TaskType} from "./App";
import Task from "./Task";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}


const ToDoList = (props: ToDoListPropsType) => {
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
    return (
        <div>


            <ToDoListHeader title={props.title}/>

            <div>
                <input/>
                <button>+</button>
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
                        onClickCallBAck={() => props.changeFilter("all")}/>
                <Button title={"Active"}
                        onClickCallBAck={() => props.changeFilter("active")}/>
                <Button title={"Completed"}
                        onClickCallBAck={() => props.changeFilter("completed")}/>


            </div>
        </div>

    );
}

export default ToDoList;