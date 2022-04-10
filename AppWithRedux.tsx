import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import ButtonAppBar from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@material-ui/core";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    /*   let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
           {id: todolistId1, title: "What to learn", filter: "all"},
           {id: todolistId2, title: "What to buy", filter: "all"}
       ])
   */

    /*  let [tasks, dispatchTasks] = useReducer(taskReducer, {
          [todolistId1]: [
              {id: v1(), title: "HTML&CSS", isDone: true},
              {id: v1(), title: "JS", isDone: true}
          ],
          [todolistId2]: [
              {id: v1(), title: "Milk", isDone: true},
              {id: v1(), title: "React Book", isDone: true}
          ]
      });*/
    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId)
        dispatch(action)
    }
        function addTask(title: string, todolistId: string) {
            dispatch(addTaskAC(title, todolistId))
        }

        function changeFilter(value: FilterValuesType, todolistId: string) {
            dispatch(changeTodolistFilterAC(todolistId, value))

        }

        function changeStatus(id: string, isDone: boolean, todolistId: string) {
            dispatch(changeTaskStatusAC(id, isDone, todolistId))
        }


        function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
            dispatch(changeTaskTitleAC(id, newTitle, todolistId))

        }

        function removeTodolist(id: string) {
            let action = removeTodolistAC(id)
            dispatch(action)

        }

        function changeTodolistTitle(id: string, title: string) {
            dispatch(changeTodolistTitleAC(id, title))
        }


        function addTodolist(title: string) {
            let action = addTodolistAC(title)
            dispatch(action)

        }

        return (
            <div className="App">
                <ButtonAppBar/>
                <Container>
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>

                    <Grid container spacing={3}>
                        {
                            todolists.map(tl => {
                                let allTodolistTasks = tasks[tl.id];
                                let tasksForTodolist = allTodolistTasks;

                                if (tl.filter === "active") {
                                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                                }
                                if (tl.filter === "completed") {
                                    tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                                }

                                return <Grid item>
                                    <Paper style={{padding: '20px'}}>
                                        <Todolist
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodolist}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            filter={tl.filter}
                                            removeTodolist={removeTodolist}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            })
                        }
                    </Grid>
                </Container>
            </div>
        );
    }

    export default AppWithRedux;
