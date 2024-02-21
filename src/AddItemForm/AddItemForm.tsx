import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {useAddItemForm} from './hooks/useAddItemForm';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


// обернули в контейн компоненту
export const AddItemForm=React.memo((props: AddItemFormPropsType)=>{
  /*  console.log("AddItemForm вызван")
    let [title, setTitle] = useState("")
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
        if(error !==null) {
            setError(null)
        }
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }
*/
const {title,onKeyPressHandler,onChangeHandler,addItem,error}=useAddItemForm(props.addItem)

    return <div>
        <TextField variant="outlined"
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>
})