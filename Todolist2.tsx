import React from 'react';
import ToDoListHeader from "./ToDoListHeader";
import Task from "./Task";
import Button from "./Button";
import TodoTitle2 from "./TodoTitle2";
import Button2 from "./Button2";
import Task2 from "./Task2";
import {TaskType, TaskType2} from "./App";

type Todolist2PropsType = {
    title: string
    tasks: Array<TaskType2>
}

const Todolist2 = (props: Todolist2PropsType) => {
    return (
        <div>
            <TodoTitle2 title={props.title}/>


            <div>
                <input/>
                <Button2 name={"+"}/>
            </div>
            <ul>
                <Task2 id={props.tasks[0].id} key={props.tasks[0].id} title={props.tasks[0].title} check={props.tasks[0].check}/>
                <Task2 id={props.tasks[1].id} key={props.tasks[1].id} title={props.tasks[1].title} check={props.tasks[1].check}/>
                <Task2 id={props.tasks[2].id} key={props.tasks[2].id} title={props.tasks[2].title} check={props.tasks[2].check}/>
                <Task2 id={props.tasks[2].id} key={props.tasks[2].id} title={props.tasks[2].title} check={props.tasks[2].check}/>


            </ul>
            <div>
                <Button2 name={"Activate"}/>
                <Button2 name={"All"}/>
                <Button2 name={"Types"}/>

            </div>
        </div>
    );
};

export default Todolist2;