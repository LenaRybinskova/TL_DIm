import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled?:boolean
}

export const  EditableSpan=React.memo((props: EditableSpanPropsType) =>{

    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        if(!props.disabled){
            setEditMode(true);
            setTitle(props.value);
        }
        else{return}

    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?    <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
