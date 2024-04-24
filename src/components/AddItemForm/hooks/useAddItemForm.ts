import {ChangeEvent, KeyboardEvent, useState} from 'react';

type UseAddItemFormType={
    onItemAdded: (title: string) => void
}

export const useAddItemForm = (onItemAdded: (title: string) => void) => {


    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            onItemAdded(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        setError(null);
        if (e.charCode === 13) {
            addItemHandler();
        }
    }

    return {title,onKeyPressHandler,onChangeHandler,addItem: addItemHandler,error}

}