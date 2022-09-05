import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/authReducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: initialStateType = {
    status: 'idle',
    error: null,
    isInitialize: false
}

type initialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialize: boolean
}
export const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string | null}>){
            state.error = action.payload.error
        },
        setInitializeAC(state, action: PayloadAction<{value: boolean}>){
            state.isInitialize = action.payload.value
        },
    }
})

export const appReducer = slice.reducer

export const { setAppStatusAC, setAppErrorAC, setInitializeAC } = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {

        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setInitializeAC({value: true}))

        } else {
            //не выводим ошибки, чтобы не нервировать пользователя))
        }
    }).catch((error) => {
        handleServerNetworkError(error, dispatch)
    })
        .finally(()=>{
            dispatch(setInitializeAC({value: true}))
            }

        )
}





