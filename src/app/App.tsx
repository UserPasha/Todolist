import React, {useCallback, useEffect} from 'react'
import './App.css'
import { TodolistsList } from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import { AppRootStateType } from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import { Menu } from '@mui/icons-material';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Login/Login";
import {Route, Routes, Navigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {LogoutTC} from "../features/Login/authReducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized =useSelector<AppRootStateType, boolean>((state) => state.app.isInitialize)
    const isLoggedIn =useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(initializeAppTC())

    },[])
    const logoutHandler=useCallback(()=>{
        dispatch(LogoutTC())
    },[])


    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
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
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log Out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={"/"} element ={<TodolistsList demo={demo}/>}/>
                    <Route path={"/login"} element ={ <Login/> }/>
                    <Route path={'/404'} element={<h1 style={{textAlign:"center"}}>404: PAGE NOT FOUND</h1>} />
                    <Route path = {'*'} element = {<Navigate to ='/404'/>}/>
                </Routes>
            </Container>
        </div>

    )
}

export default App
