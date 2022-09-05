import {Dispatch} from 'redux'

import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatusAC} from "../../app/app-reducer";


const initialState = {
    isLoggedIn: false
}

export const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedIn  (state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer
// actions
export const setIsLoggedInAC = slice.actions.setIsLoggedIn
// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const LogoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

// types

