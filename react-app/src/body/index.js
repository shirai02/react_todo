import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Checkbox, TextField, Button } from '@material-ui/core';
import { InboxIcon, DraftsIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

//ToDo Grid Layout使う
//ToDo ListItemをループで回す
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
    textField: {
        width: '100%',
    },
    form: {
        margin: theme.spacing(4, 0),
    },
}));

function TodoListItem(props) {

    const [checked, setChecked] = useState(false);

    return (
        <React.Fragment>
            <ListItem>
                <Checkbox
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    value="checked"
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
    const [itemList, setItemList] = useState(['Drafts', 'Trash', 'Spam']);
    const [textState, setTextState] = useState('');
    const items = itemList.map((name, index) => {
        return (
            <TodoListItem text={name} key={index} />
        );
    });
    const addTodo = () => {
        const newItemList = itemList.slice();
        newItemList.push(textState);
        setItemList(newItemList);
        setTextState('');
        console.log(newItemList);
    }
    const handleOnChange = (event) => {
        setTextState(event.target.value);
        // console.log(textState);
    }

    return (
        <div className={classes.root}>
            <Typography variant='h6' className={classes.title}>
                ToDo
            </Typography>
            <List component="nav">
                {items}
                <ListItem className={classes.form}>
                    <TextField label="ToDo" value={textState} onChange={event => handleOnChange(event)} className={classes.textField} />
                    <Button variant='outlined' onClick={() => addTodo()}>add</Button>
                </ListItem>
            </List>
        </div>
    );
}

export default TodoList;