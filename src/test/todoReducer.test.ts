import React from 'react'
import todoReducer, { addTask, removeTask, toggleTask } from '../reducers/todoReducer'

const state = {
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
            text: 'Tests',
            completed: false,
            isHidden: false,
        },
        {
            id: 4, 
            text: 'UIMaterial Components',
            completed: true,
            isHidden: false,
        },
    ]
}

test('Length of tasks should be incremented', () => {

	const action = addTask(5, 'Some task', false)

	const newState = todoReducer(state, action)

	expect(newState.tasks.length).toBe(5)

});

test('Text of new task should be correct', () => {

	const action = addTask(5, 'Some task', false)

	const newState = todoReducer(state, action)

	expect(newState.tasks[0].text).toBe('Some task')

});

test('After deleting length of tasks should be decrement', () => {

	const action = removeTask(1) 

	const newState = todoReducer(state, action)

	expect(newState.tasks.length).toBe(3)

});

test('After toggle completed parameter should be changed', () => {

	const action = toggleTask(1) 

	const newState = todoReducer(state, action)

	expect(newState.tasks[0].completed).toBe(false)

});




