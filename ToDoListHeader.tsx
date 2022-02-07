import React from 'react';
import c from "./ToDoListHeader.module.css"

type ToDoListHeaderPropsType = {
    title: string
    todolistsID: string
    deleteTodolist: (todolistsID:string) => void
    newTodolist: ()=> void
}

const ToDoListHeader = (props: ToDoListHeaderPropsType) => {
    // /*const onClickHandlerDeleteTodo = () => {
    //     props.deleteTodolist
    //
    // }


    return (
        <div className={c.title}>
            <button className={c.addlBut}onClick={ () => props.newTodolist}>+</button>
            <h3 className={c.tit}>{props.title}</h3>
            <button className={c.selBut} onClick={ () => props.deleteTodolist(props.todolistsID) }>X</button>
        </div>
    );
};

export default ToDoListHeader;