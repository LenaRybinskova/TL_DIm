import React, {ChangeEvent, useState} from "react";

type EditableSpanTypE = {
    title: string
    onChange: (newValue:string) => void
}
//Режим регулироваки (editeMode) мы сделаем в локальном стейте, тк это не особо выжнный момент
// и на БЛЛ (глоб стейт данных) не влияет

export function EditableSpan(props: EditableSpanTypE) {

    let [editeMode, setEditeMode] = useState(false)
    let [localTitle, setLocalTitle] = useState("") // или props.title

    const activateEditMode = () => {
        setEditeMode(true)
        // когда щелкнули сразу стейт обновится и подтянет ту стрингу которая изначально была
        setLocalTitle(props.title)
    };
    const activateViewMode = () => {
        setEditeMode(false)
        // сработал блюр, значит надо все нововведеное сохранить и передать родителю
        props.onChange(localTitle);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    return (
        editeMode
            ? <input value={localTitle} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>

    )
}