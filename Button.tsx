import React from 'react';

type ButtonPropsType = {
    title: string
    onClickCallBAck: () => void
    activeBC: boolean
}
/*const Button = (props : ButtonPropsType) => {
    return <button onClick={props.onClickCallBAck}>{props.title}</button>
};*/
const Button: React.FC<ButtonPropsType> = ({
                                               title,
                                               onClickCallBAck,
                                               activeBC,
                                           }) => {
    return (
        <button className={activeBC ? "activeBC" : ""}
                onClick={onClickCallBAck}>{title}</button>
    )
}

export default Button;