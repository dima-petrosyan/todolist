import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

type ItemProps = {
    id: number,
    text: string,
    completed: boolean,
    handleToggle: (id: number) => void,
    handleDelete: (id: number) => void,
    isHidden: boolean
}

function Item(props: ItemProps) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
        props.handleToggle(props.id)
    }

    const onDeleteItem = (event: React.MouseEvent<HTMLElement>) => {
        handleClose()
        props.handleDelete(props.id)
    }

    return (
        <ListItem button sx={[
            props.isHidden && {
                display: 'none',
            }
        ]} divider>
            <Checkbox checked={props.completed} onChange={handleChange} />
            <ListItemText sx={[
                props.completed && {
                    textDecoration: 'line-through',
                    fontStyle: 'italic',
                    color: 'primary.light',
                }
            ]} primary={props.text} />
            <Box>
                <IconButton sx={[
                    props.completed && {
                        color: 'primary.light',
                    }
                ]} onClick={handleClick}>
                    <MoreVertIcon />
                </IconButton>
                <Menu 
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={onDeleteItem} sx={{m: 0}}>
                        <Typography px={1} sx={{
                            color: 'error.main'
                        }}>Delete</Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </ListItem>
    )
}

export default Item





