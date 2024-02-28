import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useAddItemForm} from './hooks/useAddItemForm';

type AddItemFormPropsType = {
    onItemAdded: (title: string) => void
    disabled?:boolean
}


// обернули в контейн компоненту
export const AddItemForm=React.memo(({onItemAdded,disabled=false}: AddItemFormPropsType)=>{

const {title,onKeyPressHandler,onChangeHandler,addItem,error}=useAddItemForm( onItemAdded)

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   //диз если лоадинг
                   disabled={disabled}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem} disabled={disabled}>
            <AddBox />
        </IconButton>
    </div>
})


// НАДО ЛИ ДИЗЕЙБЛ ПРОКИДЫВАТЬ В ХУК??