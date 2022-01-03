import React from 'react';

type ToDoListHeaderPropsType = {
    title : string
}

const ToDoListHeader = ({title}: ToDoListHeaderPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
        </div>
    );
};

export default ToDoListHeader;