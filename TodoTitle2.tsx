import React from 'react';

type TodoTitle2Props={
    title: string
}

const TodoTitle2 = (props: TodoTitle2Props) => {
    return (
        <div>
            <h3>{props.title}</h3>
        </div>
    );
};

export default TodoTitle2;