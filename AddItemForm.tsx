import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button, TextField} from "@material-ui/core";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const  AddItemForm= memo((props: AddItemFormPropsType) =>{
    console.log("addForm rendered")
    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {

        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>

        <TextField
            error={!!error}
            id="outlined-basic"
            label={title}
            variant="outlined"
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            helperText={error}
            size={"small"}
        />


        <Button variant="contained" onClick={addItem}
                style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}}>+</Button>

    </div>
})
