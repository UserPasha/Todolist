import React from 'react';


type Task2PropsType = {
    id: number
    title: string
    check: boolean

}

const Task2 = (props: Task2PropsType) => {

    return (
        <div>
            <li ><input type="checkbox" checked={props.check}/> <span>{props.title}</span></li>
        </div>
    );
};

export default Task2;