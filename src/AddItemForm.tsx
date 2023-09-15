//------------------------------------------------------------------
// универс переиспользуемый инпут( для ТЛ он будет добавл ТЛ, внутри ТЛ он будет добавл таски - разница будет в коллбеках)
import React, {KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button';

type addItemFormPropsType = {
    addItem: ( title: string) => void
}

export function AddItemForm(props: addItemFormPropsType) {
    const [newTAskTitle, setNewTAskTitle] = useState("")
    const [error, setError] = useState<string | null>(null) // или можно " " вместо налл

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTAskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // при вводе в инпут сразу обнул стейт по ошибке и строка с сообщением об ошибке должна уйти
        setError(null)
        if (e.key === "Enter") {
            addTask();
        }
    }

    const addTask = () => {
        if (newTAskTitle.trim() !== "" && newTAskTitle !== "kakashka") {
            props.addItem(newTAskTitle.trim())
            setNewTAskTitle("")
        } else {
            setError("title is required")
        }
    }

    return (
        <div>
            <input value={newTAskTitle}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>
            <Button onClick={addTask} variant={"contained"} color={"primary"}>+</Button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}