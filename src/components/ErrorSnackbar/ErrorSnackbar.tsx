import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../app/store';
import {setAppErrorAC} from '../../app/app-reducer';


export function ErrorSnackbar() {

    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        // если гдето мимо кликаем, то не уберется сообщение
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({error:null}))
    }

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={error !== null}
            onClose={handleClose}
            message={error}
            key={error + 'snackbar'}
            autoHideDuration={3000}
        />
    );
}

