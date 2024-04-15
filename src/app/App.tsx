import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import TodolistsList from '../features/Todolists/TodolistList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {initializedAppTC, RequestStatusType} from './app-reducer';
import {Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';
import {ThunkDispatch} from 'redux-thunk';
import {logoutTC} from '../features/Login/auth-reducer';


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const dispatch: ThunkDispatch<AppRootStateType, any, any> = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.iSInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)


    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])


    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}><CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
            </AppBar>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed>
                <Routes>
                    {/*если  URL только слеш, то список ТЛ - это со старта приложения*/}
                    <Route path="/" element={<TodolistsList demo={demo}/>}/>
                    {/*если в URL login, то рендериться компонента Login*/}
                    <Route path="login" element={<Login/>}/>
                </Routes>
            </Container>
        </div>


    );
}


export default App;
