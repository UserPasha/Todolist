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
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    //Warehouse of data
    //const ToDoListTitle: string = "What to learn"

let todolistID1 = v1()
let todolistID2 = v1()

   /* const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/ES6", isDone: true},
            {id: v1(), title: "REACT", isDone: false},
            {id: v1(), title: "REDUX", isDone: false}
        ]
    )*/
    const [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS/ES62", isDone: true},
            {id: v1(), title: "REACT2", isDone: false},
            {id: v1(), title: "REDUX2", isDone: false}
    ],
        [todolistID2]:[
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS/ES6", isDone: true},
        {id: v1(), title: "REACT", isDone: false},
        {id: v1(), title: "REDUX", isDone: false}
    ]}
    )
    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ])
//    const [filter, setFilter] = useState<FilterValuesType>("all")
    const changeFilter = (todolistsID:string, value: FilterValuesType) => {
        setTodolists(todolists.map((m)=> m.id===todolistsID? {...m, filter: value}: m))
    }

   /* const getTaskForRender = () => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }*/
    const addTask = (todolistsID:string, title: string) => {

       let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks,[todolistsID]:[newTask, ...tasks[todolistsID] ]})
        // const updateTasks: Array<TaskType> = [newTask, ...tasks]
        // setTasks(updateTasks)
    }


    const removeTask = (todolistsID:string,taskID: string) => {
        // const filteredTasks = tasks.filter(t => t.id !== taskID)
        setTasks({...tasks,[todolistsID]:tasks[todolistsID].filter(f => f.id !== taskID)})

    }
    const changeTaskStatus = (todolistsID:string, taskID: string, isDone: boolean) => {
        setTasks({...tasks,[todolistsID]:tasks[todolistsID].map(m=> m.id===taskID ? {...m, isDone}: m)})
       //для тестов в параметрах нужно добавить isDone: boolean

        // const updatedBooleanTasks = tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        // setTasks(updatedBooleanTasks)                             // {...t, isDone: isDone}  = {...t, isDone}
    }
    // const deleteTodolist = (todolistsID:string)=>{
    //     setTodolists(todolists.filter(f => f.id !== todolistsID))
    //     delete tasks[todolistsID]
    //     setTasks({...tasks})
    // }

    //UI
    return (
        <div className="App">
            {todolists.map((tl, index) => {
                let tasksForRender = tasks[tl.id]
                if (tl.filter === "active"){
                    tasksForRender = tasks[tl.id].filter(t => t.isDone === false)
                }
                else if (tl.filter === "completed"){
                    tasksForRender = tasks[tl.id].filter(t => t.isDone === true)
                }
                    return (
                        <ToDoList
                            key={index}
                            todolistsID = {tl.id}
                            title={tl.title}
                            tasks={tasksForRender}
                            filter={tl.filter}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeTaskStatus}
                            /*deleteTodolist={deleteTodolist}*/
                        />
                    )
                }
            )
            }


        </div>
    );
}

export default App;
