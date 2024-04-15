import {FormControl} from '@material-ui/core';
import {Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import React from 'react';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from './auth-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType} from '../../app/store';
import { Navigate } from 'react-router-dom';

export const Login: React.FC = () => {
    const dispatch: ThunkDispatch<AppRootStateType, any, any> =  useDispatch()
    const isLoggedIn=useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)

    const formik = useFormik({
        //initialValues стартовые значения формы
        initialValues: {email: '', password: '', rememberMe: false},

        // когда мы что то в инпуты вводим, сюда кажд новая буква будет приходить в новом объекте values
        validate: (values) => {
            //если в values.email ничего нет
            if (!values.email) {return {email: 'email is required'}}
            if (!values.password) {return {password: 'password is required'}}
        },

        // onSubmit это коллбек(formik.handleSubmit), в который форма собрала  в values все значения введеные в инпуты
        onSubmit: values => {
            console.log("values", values)
            dispatch(loginTC(values))
        },

    });

    //залогинена? редирект на гл страницу
    if(isLoggedIn){
        console.log("isLoggedIn", isLoggedIn)
        return (<Navigate to="/"/>)
    }

    return (
        <Grid container justifyContent="center">
            {/*            обор тегом Форм, кнопка дб обязательно с типом сабмит. когда наж на кн, срабатывает онСабмит событие
                onSubmit={(event)=>{event.preventDefault()}}*/}
            <form onSubmit={formik.handleSubmit}>

                <Grid item xs={4}> {/*xs={4} значит шир 4 ячейки*/}
                    <FormControl> {/*FormControl обертка обяз для разметки*/}
                        <FormLabel>{/*...*/}</FormLabel> {/*FormLabel просто для юзеров текст-инструкц в форме*/}
                        <FormGroup> {/*FormGro группирует филды(инпуты)*/}
                            <TextField
                                label="Email"
                                margin="normal"
                                /* name="email"
                                   onChange={formik.handleChange}
                                   value={formik.values.email}*/
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null} {/*// отобр ошибки*/}

                            <TextField type={'password'} label="password" margin="normal"{...formik.getFieldProps('password')}/>
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null} {/*// отобр ошибки*/}

{/*                            FormControlLabel делает слова РемемберМи тоже чекет*/}
                            <FormControlLabel control={<Checkbox  {...formik.getFieldProps('rememberMe')}
                                                                  checked={formik.values.rememberMe}/>}
                                              label={'Remember me'}/>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </Grid>
            </form>
        </Grid>
    )
}