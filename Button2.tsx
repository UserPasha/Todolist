import React from 'react';

type Button2PropsType = {
    name: string
}
const Button2 = (props: Button2PropsType) => {
    return (
        <div>
            <button> {props.name}</button>
        </div>
    );
};

export default Button2;