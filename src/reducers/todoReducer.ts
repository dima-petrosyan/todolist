import React from 'react'

type Task = {
    id: number,
    text: string,
    completed: boolean,
    isHidden: boolean
}

type TodoState = {
    tasks: Array<Task>
}

export const defaultState: TodoState = {
    tasks: [
        {
            id: 1, 
            text: 'Use React Hooks',
            completed: true,
            isHidden: false,
        },
        {
            id: 2, 
            text: 'Use Typescript',
            completed: false,
            isHidden: false,
        },
        {
            id: 3, 
            text: 'Tests Driven Development',
            completed: false,
            isHidden: false,
        },
        {
            id: 4, 
            text: 'UIMaterial Components',
            completed: true,
            isHidden: false,
        },
        {
            id: 5, 
            text: 'Deploy on Github Pages',
            completed: true,
            isHidden: false,
        },
    ]
}

type Action = 
    | { type: 'SET-ALL' | 'SET-ACTIVE' | 'SET-COMPLETED' } 
    | { type: 'REMOVE-TASK', id: number }
    | { type: 'TOGGLE-TASK', id: number }
    | { type: 'ADD-TASK', newTask: Task }

export const addTask = (id: number, text: string, completed: boolean, isHidden: boolean = false): Action => ({
    type: 'ADD-TASK',
    newTask: {
        id, 
        text, 
        completed,
        isHidden
    }
})

export const removeTask = (id: number): Action => ({
    type: 'REMOVE-TASK',
    id
})

export const toggleTask = (id: number): Action => ({
    type: 'TOGGLE-TASK',
    id
})

const todoReducer = (state: TodoState, action: Action): TodoState => {
    switch (action.type) {
        case 'ADD-TASK': {
            return {
                ...state,
                tasks: [action.newTask, ...state.tasks]
            }
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id != action.id)
            }
        }
        case 'TOGGLE-TASK': {
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.id === action.id) {
                        return {
                            ...task,
                            completed: !task.completed,
                        }
                    }
                    return task
                })
            }
        }
        case 'SET-ALL': {
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    return {
                        ...task,
                        isHidden: false,
                    }
                })
            }
        }
        case 'SET-ACTIVE': {
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    return {
                        ...task,
                        isHidden: task.completed,
                    }
                })
            }
        }
        case 'SET-COMPLETED': {
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    return {
                        ...task,
                        isHidden: !task.completed,
                    }
                })
            }
        }
        default: 
            return state
    }
}

export default todoReducer





