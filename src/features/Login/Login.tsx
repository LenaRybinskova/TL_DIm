import {FormControl} from '@material-ui/core';
import {Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import React from 'react';
import {FormikHelpers, useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {loginTC} from './auth-reducer';
import {ThunkDispatch} from 'redux-thunk';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {Navigate} from 'react-router-dom';


type FormValues = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login: React.FC = () => {
/*        const dispatch = useAppDispatch()*/
    const dispatch: ThunkDispatch<AppRootStateType, any, any> = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const formik = useFormik({
        //initialValues стартовые значения формы
        initialValues: {email: '', password: '', rememberMe: false},

        // когда мы что то в инпуты вводим, сюда кажд новая буква будет приходить в новом объекте values
        validate: (values) => {
            //если в values.email ничего нет
            if (!values.email) {
                return {email: 'email is required'}
            }
            if (!values.password) {
                return {password: 'password is required'}
            }
        },

        // onSubmit это коллбек(formik.handleSubmit), в который форма собрала  в values все значения введеные в инпуты
        onSubmit: async (values, formikHelpers: FormikHelpers<FormValues>) => {
            const action = await dispatch(loginTC(values))
            /*if (action.type === loginTC.rejected.type)*/// сравнение обычное. просто с исп утилитного метода match
            console.log('action', action)
            if (loginTC.rejected.match(action)) {
                console.log('сюда попали')
                if (action.payload?.fieldsErrors?.length) {
                    const err = action.payload?.fieldsErrors[0]
                    console.log('err', err)
                    /*                formikHelpers.setFieldError('email', 'some error')*/
                    formikHelpers.setFieldError(err.field, err.error)
                }
            } else {
            }
        },

    });

    //залогинена? редирект на гл страницу
    if (isLoggedIn) {
        console.log('isLoggedIn', isLoggedIn)
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

                            <TextField type={'password'} label="password"
                                       margin="normal"{...formik.getFieldProps('password')}/>
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