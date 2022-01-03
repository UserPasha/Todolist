import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    //Warehouse of data
    const ToDoListTitle_1: string = "What to learn"
    const ToDoListTitle_2: string = "What to buy"
    const ToDoListTitle_3: string = "What to read"
    const task_1 : Array<TaskType> =[
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS/ES6", isDone: true},
        {id: 3, title: "REACT", isDone: false}
    ]
    const task_2 : Array<TaskType> =[
        {id: 4, title: "Water", isDone: true},
        {id: 5, title: "Milk", isDone: true},
        {id: 6, title: "Beer", isDone: true}
    ]
    const task_3 : Array<TaskType> =[
        {id: 7, title: "Book", isDone: true},
        {id: 8, title: "Books", isDone: true},
        {id: 9, title: "Boooks)", isDone: false}
    ]
    //UI
    return (
        <div className="App">
            <ToDoList title={ToDoListTitle_1} tasks={task_1}/>
            <ToDoList title={ToDoListTitle_2} tasks={task_2}/>
            <ToDoList title={ToDoListTitle_3} tasks={task_3}/>
        </div>
    );
}

export default App;
