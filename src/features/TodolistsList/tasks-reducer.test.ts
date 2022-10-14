import {addTaskTC, fetchTasksTC, removeTaskTC, tasksReducer, TasksStateType, updateTaskTC} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC} from "./todolists-reducer";

let startState: TasksStateType = {}
beforeEach(() => {
    startState = {
        "todolistOne": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, todoListId: 'todolistOne',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "React", status: TaskStatuses.New, todoListId: 'todolistOne',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "JS", status: TaskStatuses.Completed, todoListId: 'todolistOne',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],
        "todolistTwo": [
            {
                id: "1", title: "Nya", status: TaskStatuses.New, todoListId: 'todolistTwo',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "2", title: "Card", status: TaskStatuses.New, todoListId: 'todolistTwo',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            },
            {
                id: "3", title: "Toolkit", status: TaskStatuses.Completed, todoListId: 'todolistTwo',
                description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
            }
        ],

    }
})

test('correct task should be deleted from correct array', () => {
    const param = {taskId: '2', todolistId: "todolistOne"}
    const action = removeTaskTC.fulfilled(param, "requestId", param)
    const endState = tasksReducer(startState, action)

    expect(endState["todolistOne"].length).toBe(2)
    expect(endState["todolistTwo"].length).toBe(3)
    expect(endState["todolistOne"].every(t => t.id !== "2")).toBeTruthy()
})
test('correct task should be added to correct array', () => {
    const task = {
        id: "444", title: "New Task", status: TaskStatuses.New, todoListId: 'todolistTwo',
        description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
    }
    const action = addTaskTC.fulfilled(task, "requestId", {title: task.title, todolistId: task.todoListId})
    const endState = tasksReducer(startState, action)

    expect(endState["todolistOne"].length).toBe(3)
    expect(endState["todolistTwo"].length).toBe(4)
    expect(endState["todolistTwo"][0].id).toBeDefined()
    expect(endState["todolistTwo"][0].title).toBe('New Task')
    expect(endState["todolistTwo"][0].status).toBe(TaskStatuses.New)
})
test('status of selected task should be changed', () => {
    const updateModel = {taskId: "2", todolistId: "todolistOne", model: {status: TaskStatuses.Completed}}
    const action = updateTaskTC.fulfilled(updateModel, "requestId",  updateModel)
    const endState = tasksReducer(startState, action)

    expect(endState["todolistOne"][1].status).toBe(TaskStatuses.Completed)
    expect(endState["todolistTwo"][1].status).toBe(TaskStatuses.New)
})
test('title of selected task should be changed', () => {
    const updateModel = {taskId: "2", todolistId: "todolistTwo", model: {title: "Test"}}
    const action = updateTaskTC.fulfilled(updateModel, "requestId",  updateModel)
    const endState = tasksReducer(startState, action)

    expect(endState["todolistOne"][1].title).toBe('React')
    expect(endState["todolistTwo"][1].title).toBe('Test')
})
test("new array should be added, when mew todolist is added", () => {
    const payload = {todolist: {id: "NTDL", title: 'Whats will be done?', order: 0, addedDate: ''}}
    const action = addTodolistTC.fulfilled(payload, "requestId", 'Whats will be done?')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== "todolistOne" && k !== "todolistTwo")
    if (!newKey) {
        throw Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
    const action = removeTodolistTC.fulfilled({id: 'todolistTwo'}, "requestId", 'todolistTwo')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    expect(keys.length).toBe(1)
    expect(endState["todolistTwo"]).not.toBeDefined()
})
test('empty array should be added when we set todolist', () => {
    const test = {todolists:
            [{id: '1', title: 'new', order: 0, addedDate: ''}, {id: '2', title: 'new2', order: 0, addedDate: ''}
            ]
    }
    const action = fetchTodolistsTC.fulfilled(test, "requestId")
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)
    expect(keys.length).toBe(2)
    expect(endState["1"]).toBeDefined()
    expect(endState["2"]).toBeDefined()
})
test('task should be added to todolist', ()=>{
    const action = fetchTasksTC.fulfilled({tasks: startState['todolistOne'], todolistId: 'todolistOne' }, '', 'todolistOne')
    const endState = tasksReducer({
        "todolistOne": [],
        "todolistTwo": []
    }, action)
    expect(endState["todolistOne"].length).toBe(3)
    expect(endState["todolistTwo"].length).toBe(0)
})