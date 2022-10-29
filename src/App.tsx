import React, { useState, useReducer } from 'react'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Item from './components/Item'
import { lightBlue } from '@mui/material/colors'
import todoReducer from './reducers/todoReducer'
import { addTask, removeTask, toggleTask, defaultState } from './reducers/todoReducer'

function App() {

    const [state, dispatch] = useReducer(todoReducer, defaultState)
    const [inputText, setInputText] = useState('')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value)
    }

    const handleAdd = (text: string) => {
        if (inputText != '') {
            if (!state.tasks.find(task => task.text === inputText)) {
                let id = state.tasks.reduce((acc, item) => {
                    if (acc < item.id) {
                        return item.id
                    }
                    return acc
                }, state.tasks[0].id) + 1
                dispatch({ type: 'SET-ALL' })
                dispatch(addTask(id, text, false))
            }
        }
        setInputText('')
    }

    const handleToggle = (id: number) => {
        dispatch(toggleTask(id))
    }

    const handleDelete = (id: number) => {
        dispatch(removeTask(id))
    }

    return (
        <Stack direction='row' sx={{
            minHeight: '100vh',
            p: 6,
            pt: 0,
            bgcolor: lightBlue[50],
            justifyContent: 'center',
            alignItems: 'flex-start',
        }}>
            <Paper elevation={5} sx={{
                borderRadius: 4,
                mt: 15,
                maxWidth: '500px',
                width: '100%',
            }}>
                <Typography sx={{
                    color: 'primary.main',
                    textAlign: 'center',
                    p: 2,
                    fontWeight: 600
                }} variant='h5'>To Do List</Typography>
                <Stack sx={{
                    px: 3, gap: 3
                }} direction='row'>
                    <TextField value={inputText} onChange={handleInputChange} sx={{
                        flex: 4
                    }} size='small' label='Type new task' variant='outlined' />
                    <Button onClick={() => handleAdd(inputText)} variant='outlined' sx={{
                        flex: 1
                    }}>Add</Button>
                </Stack>
                <List sx={{
                }}>
                    {
                        state.tasks.map(props => {
                            return (
                                <Item 
                                    key={props.id}
                                    {...props}
                                    handleToggle={handleToggle}
                                    handleDelete={handleDelete}
                                />
                            )
                        })
                    }
                </List>
                <ButtonGroup sx={{
                    mx: 3,
                    mt: 1,
                    mb: 2,
                }}>
                    <Button onClick={() => dispatch({type: 'SET-ALL'})}>All</Button>
                    <Button onClick={() => dispatch({type: 'SET-ACTIVE'})}>Active</Button>
                    <Button onClick={() => dispatch({type: 'SET-COMPLETED'})}>Completed</Button>
                </ButtonGroup>
            </Paper>
        </Stack>
    )
}

export default App










