import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Checkbox } from '@material-ui/core';
import { InboxIcon, DraftsIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

//ToDo Grid Layout使う
//! classを使用しない

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        left: '50%',
        transform: 'translate(-50%, 0%)',
        width: '100%',
        maxWidth: 900,
        backgroundColor: theme.palette.background.paper,
        textAlign: 'center',
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function TodoListItem(props) {

    const [checked, setChecked] = useState(false);

    return (
        <React.Fragment>
            <ListItem>
                <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    value="checkedA"
                    color="primary"
                    // indeterminate
                    inputProps={{
                        'aria-label': 'primary checkbox',
                    }}
                />
                <ListItemText primary={props.text} />
            </ListItem>
            <Divider />
        </React.Fragment>
    )
}

function TodoList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant='h6' className={classes.title}>
                ToDo
            </Typography>
            <List
                component="nav"
            >
                <TodoListItem text='test' />
                <TodoListItem text='Drafts' />
                <TodoListItem text='Trash' />
                <TodoListItem text='Spam' />
                {/* <TodoListItem /> */}
            </List>
        </div>
    );
}

export default TodoList;