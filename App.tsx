import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import {v1} from "uuid";

//Create
//Read
//Update
//Delete

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    //Warehouse of data
    const ToDoListTitle: string = "What to learn"

    /*let tasks: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS/ES6", isDone: true},
        {id: 3, title: "REACT", isDone: false},
        {id: 4, title: "REDUX", isDone: false}
    ]*/
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
            {id: v1(), title: "REDUX", isDone: false}
        ]
    )
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    /*if (filter === "active"){
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed"){
        tasksForRender = tasks.filter(t => t.isDone === true)
    }*/
    const getTaskForRender = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }
    const addTask = (title: string) => {

        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        const updateTasks: Array<TaskType> = [newTask, ...tasks]
        setTasks(updateTasks)
    }
    const tasksForRender = getTaskForRender()

    const removeTask = (taskID: string) => {
        // const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks(tasks.filter(t => t.id !== taskID))
        console.log()
    }


    //UI
    return (
        <div className="App">


            <ToDoList
                title={ToDoListTitle}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
            {/*  <ToDoList title={ToDoListTitle_2} tasks={task_2}/>
            <ToDoList title={ToDoListTitle_3} tasks={task_3}/>
            <ToDoList title={ToDoListTitle_3} tasks={task_3}/>*/}
        </div>
    );
}

export default App;
