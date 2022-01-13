import React from 'react';

type ButtonPropsType = {
    title : string
    onClickCallBAck: () => void
}
/*const Button = (props : ButtonPropsType) => {
    return <button onClick={props.onClickCallBAck}>{props.title}</button>
};*/
const Button: React.FC<ButtonPropsType> = ({
    title,
    onClickCallBAck
}) => {
    return <button onClick={onClickCallBAck}>{title}</button>
}

export default Button;