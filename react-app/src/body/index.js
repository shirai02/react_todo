import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Checkbox, TextField, Button, ButtonGroup } from '@material-ui/core';
import red from '@material-ui/core/colors/red'
import { HighlightOff } from '@material-ui/icons';
import useStyles from './style';

//ToDo Grid Layout使う
//ToDo delete機能の実装
//! classを使用しない

function TodoListItem(props) {

    const [checked, setChecked] = useState(false);
    // const [displayButton, setDisplayButton] = useState(false);

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
                {checked ? (
                    <ButtonGroup aria-label="outlined primary button group">
                        <Button>
                            edit
                        </Button>
                        <Button color="secondary" style={{ color: red[800] }} onClick={() => props.delete(props.index)}>
                            delete
                    </Button>
                    </ButtonGroup>
                ) : null}
            </ListItem>
            <Divider />
        </React.Fragment >
    )
}

function TodoList() {
    const classes = useStyles();
    const [itemList, setItemList] = useState(['Drafts', 'Trash', 'Spam']);
    const [textState, setTextState] = useState('');
    const items = itemList.map((name, index) => {
        return (
            <TodoListItem text={name} key={index} index={index} delete={i => deleteTodo(i)} />
        );
    });
    const addTodo = () => {
        const newItemList = itemList.slice();
        newItemList.push(textState);
        setItemList(newItemList);
        setTextState('');
        // console.log(newItemList);
    }
    const deleteTodo = (i) => {
        const newItemList = itemList.slice();
        newItemList.splice(i, 1);
        setItemList(newItemList);
        console.log(i)
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