import React from 'react';

type TypeTodoTitleProps = {
    title: string
}

const TodoTitle = (props: TypeTodoTitleProps) => {
    return (
        <div>
                <h3>{props.title}</h3>
        </div>
    );
};

export default TodoTitle;