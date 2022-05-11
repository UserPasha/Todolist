import React, {useCallback} from 'react';
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
} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./task-reducer";
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

    const removeTask = useCallback((id: string, todolistId: string) => {
            let action = removeTaskAC(id, todolistId)
            dispatch(action)
        }
        ,
        [dispatch]
    )
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
            dispatch(changeTodolistFilterAC(todolistId, value))
        }
        ,
        [dispatch]
    )

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
            dispatch(changeTaskStatusAC(id, isDone, todolistId))
        }
        ,
        [dispatch]
    )


    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
            dispatch(changeTaskTitleAC(id, newTitle, todolistId))
        }
        ,
        [dispatch]
    )

    const removeTodolist = useCallback((id: string) => {
            let action = removeTodolistAC(id)
            dispatch(action)

        },
        [dispatch]
    )

    const changeTodolistTitle = useCallback((id: string, title: string) => {
            dispatch(changeTodolistTitleAC(id, title))
        },
        [dispatch]
    )


    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

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
                            let tasksForTodolist = allTodolistTasks
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
