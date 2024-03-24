import React from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import TodolistsList from '../features/Todolists/TodolistList';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import {RequestStatusType} from './app-reducer';
import { Route, Routes} from 'react-router-dom';
import {Login} from '../features/Login/Login';


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
                    <Button color="inherit">Login</Button>
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
