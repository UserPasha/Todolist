import React from 'react';
import c from"./ToDoListHeader.module.css"

type ToDoListHeaderPropsType = {
    title : string
    todolistsID:string
    // deleteTodolist:(todolistsID:string)=> void
}

const ToDoListHeader = ({title}: ToDoListHeaderPropsType) => {
    // const onClickHandlerDeleteTodo=()=>{
    //     props.deleteTodolist(props.id)
    //
    //     }


    return (
        <div className={c.title}>
            <h3>{title}</h3>
            {/*<button onClick={onClickHandlerDeleteTodo}>X</button>*/}
        </div>
    );
};

export default ToDoListHeader;