import {
    addTodolistTC,
    changeTodolistEntityStatusAC, changeTodolistFilterAC, changeTodolistTitleTC,
    fetchTodolistsTC, FilterValuesType, removeTodolistTC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {RequestStatusType} from "../../app/app-reducer";


let todolistIdOne: string
let todolistIdTwo: string
let startState: Array<TodolistDomainType> = []

beforeEach(() => {
    todolistIdOne = "T1"
    todolistIdTwo = "T2"
    startState = [
        {id: todolistIdOne, title: 'What to learn', addedDate: '', order: 0, entityStatus: "idle", filter: "all"},
        {id: todolistIdTwo, title: 'What to buy', addedDate: '', order: 0, entityStatus: "idle", filter: "all"}
    ]
})

test('correct todolist should be removed', () => {
    const action = removeTodolistTC.fulfilled({id: todolistIdOne}, "requestId", todolistIdOne )
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistIdTwo)
})
test('correct todolist should be added', () => {
    const todo = {
        todolist: {
            title: "New TODO",
            id: "T3",
            order: 0,
            addedDate: ''
        }}
    const action = addTodolistTC.fulfilled(todo, "requestId", "New TODO")
    const endState = todolistsReducer(startState, action)
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("New TODO")
    expect(endState[0].filter).toBe("all")
})
test('correct todolist name should be changed', ()=>{
    const action = changeTodolistTitleTC.fulfilled({title: 'new title', id: todolistIdTwo}, "requestId", {title: 'new title', id: todolistIdTwo})
    const endState = todolistsReducer(startState, action)
    expect(endState[1].title).toBe('new title')
    expect(endState[0].title).toBe('What to learn')
})
test('correct todolist filter should be changed', ()=>{
    let newFilter: FilterValuesType = 'completed'
    const action = changeTodolistFilterAC({filter: newFilter, id: todolistIdTwo})
    const endState = todolistsReducer(startState, action)
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('completed')
})
test('todolist should be added', ()=>{
    const action = fetchTodolistsTC.fulfilled({todolists: startState}, "requestId")
    const endState = todolistsReducer([], action)
    expect(endState.length).toBe(2)
})
test('correct todolist entity status should be changed', ()=>{
    let newStatus: RequestStatusType = "loading"
    const action = changeTodolistEntityStatusAC({status: newStatus, id: todolistIdOne})
    const endState = todolistsReducer(startState, action)
    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[1].entityStatus).toBe('idle')
})