import React, {ChangeEvent} from 'react';
import {TaskType} from "./App";

type TaskPropsType = TaskType & {
    removeTask: (todolistsID: string, taskID: string) => void
    changeTaskStatus: (todolistsID: string, taskID: string, isDone: boolean) => void
    todolistsID: string
}


const Task = (props: TaskPropsType) => {
    const id = props.id
    const isDone = props.isDone
    const title = props.title
    const removeTask = props.removeTask

    //   const onChangeStatus = () => props.changeTaskStatus(id, isDone)
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {

        props.changeTaskStatus(props.todolistsID, id, e.currentTarget.checked)
    }
    return (

        <li className={isDone ? "is-done" : ""}>
            <input
                type="checkbox"
                onChange={onChangeStatus}
                checked={isDone}/>
            <span>{title}</span>
            <button onClick={() => removeTask(props.todolistsID, id)}>X</button>
        </li>

    );
};

export default Task;


/*function tuu   (arr) {
    let y=0;
    for (let i=0; i<arr.length; i++){
if (arr[i]>y){
    y=arr[i]
}
    }return y
}*/
//1 Функция, принмает массив чисел  и возвращает  максимальное число
//2 Функция, принмает массив чисел  и возвращает  массив с двумя максималными значениями
//3 Функция принимает массив и количество максимумов, которе можно найти и возвращает массив с макс значениями
// math max не sort - не использовать
