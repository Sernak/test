import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}


type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {

    let todolistID_1 = v1()
    let todolistID_2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'},
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
    })


    const removeTask = (taskId: string, todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const nextState: TasksStateType = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(nextState)
    }

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const nextState: Array<TodolistType> = todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl)
        setTodolists(nextState)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => (t.id == taskId ? {...t, isDone: taskStatus} : t)),
        }
        setTasks(newTodolistTasks)
    }

    const removeTodolist = (todolistId: string) => {
        const resultRemove = todolists.filter(t => t.id !== todolistId)
        setTodolists(resultRemove)

    }

    const todolistComponents = todolists.map(tl => {

        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === 'active') {
            tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
        }

        if (tl.filter === 'completed') {
            tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
        }

        return (
            <Todolist
                key={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodolist}
                todolistId={tl.id}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodolist={removeTodolist}

            />
        )
    })


    return (
        <div className="App">
            {todolistComponents}
        </div>
    );
}

export default App;
