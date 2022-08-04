const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

//type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}

export const setErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error}as const
}
export const setStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status}as const
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed' | 'progress-percent'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>
type ActionsType = SetErrorActionType | SetStatusActionType