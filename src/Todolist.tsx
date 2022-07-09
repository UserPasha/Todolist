import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist = memo((props: PropsType)=> {
    console.log("Todo Rendered")
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    },[props.id, props.changeTodolistTitle])

    const onAllClickHandler = useCallback(() => props.changeFilter(props.id,"all" ), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id,"active" ), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id,"completed" ), [props.changeFilter, props.id]);

    let taskForTodolist = props.tasks;


    if (props.filter === "active") {
        taskForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        taskForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolist}>
                <Delete/>
            </IconButton>

        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                taskForTodolist.map(t => <Task
                    key={t.id}
                    task={t}
                    todolistId={props.id}
                    removeTask={props.removeTask}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                  />)
                }

        </ul>
        <div>

            <Button variant={props.filter==='all'?"outlined" : "contained"} color="primary" onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter==='active'?"outlined" : "contained"} color="secondary" onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter==='completed'?"outlined" : "contained"} color="default" onClick={onCompletedClickHandler}>Completed</Button>


        </div>
    </div>
})

