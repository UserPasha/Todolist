import {TasksStateType} from '../App';
import {
    AddTodolistActionType,
    changeTodolistTitleAC,
    RemoveTodolistActionType,
    SetTodolistActionType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}

export type SetTaskActionType = {
    type: 'SET-TASK',
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTaskActionType

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask= action.task
            const tasks = stateCopy[newTask.todoListId]
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy;
        }
        case 'CHANGE-TASK-STATUS': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'CHANGE-TASK-TITLE': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, title: action.title} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLIST": {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case "SET-TASK": {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string  ): SetTaskActionType=> {
    return{type: "SET-TASK", tasks, todolistId }
}

export const fetchTasksTC = (todolistId: string) =>{
    return (dispatch: Dispatch)=>{
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (todolistId: string, taskId: string)=>{
    return(dispatch: Dispatch)=>{
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res)=>{
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

export const addtaskTC = (todolistId: string, title: string)=>{
    return(dispatch: Dispatch)=>{
        todolistsAPI.createTask(todolistId, title)
            .then(res=>{
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string)=>{
    return(dispatch: Dispatch)=>{
        todolistsAPI.updateTodolist(id, title)
            .then((res)=>{
                dispatch(changeTodolistTitleAC(id, title))
            })
    }
}
export const changeTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses)=>{
    return(dispatch: Dispatch, getState:()=> AppRootStateType)=>{
        const state = getState()
        // const task = state.tasks[todolistId].map(m=> m.id===taskId)
        const task = state.tasks[todolistId].find(t=> t.id === taskId)
        if(!task){
            console.warn("task not found in the state")
            return
        }
        const model:UpdateTaskModelType ={
            status: status,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            title: task.title
        }
        todolistsAPI.updateTask(todolistId, taskId, model)
            .then((res)=>{
                dispatch(changeTaskStatusAC( taskId, status, todolistId))
            })
    }
}

export const changeTaskTitleTC = (id: string, newTitle: string, todolistId: string)=>{
    return(dispatch: Dispatch, getState:()=> AppRootStateType)=>{
        const state = getState()
        // const task = state.tasks[todolistId].map(m=> m.id===taskId)
        const task = state.tasks[todolistId].find(t=> t.id === id)
        if(!task){
            console.warn("task not found in the state")
            return
        }
        const model:UpdateTaskModelType ={
            status: task.status,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            title: newTitle
        }
        todolistsAPI.updateTask(todolistId, id, model)
            .then((res)=>{
                dispatch(changeTaskTitleAC(id, newTitle, todolistId ))
            })
    }
}
