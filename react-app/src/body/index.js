import React, { useState } from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Checkbox, TextField, Button, ButtonGroup } from '@material-ui/core';
import red from '@material-ui/core/colors/red'
import { HighlightOff } from '@material-ui/icons';
import useStyles from './style';

//ToDo Grid Layout使う
//ToDo delete機能の実装
//! classを使用しない

function TodoListItem(props) {

    // const [checked, setChecked] = useState(false);
    // const [displayButton, setDisplayButton] = useState(false);

    return (
        <React.Fragment>
            <ListItem>
                <Checkbox
                    checked={props.item.checked}
                    onChange={() => props.handleChecked(props.index)}
                    value="checked"
                    color="primary"
                    // indeterminate
                    inputProps={{
                        'aria-label': 'primary checkbox',
                    }}
                />
                <ListItemText primary={props.item.text} />
                {props.item.checked ? (
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
    const [itemList, setItemList] = useState(
        [
            { text: 'Drafts', checked: false },
            { text: 'Trash', checked: false },
            { text: 'Spam', checked: false },
        ]
    );
    const [textState, setTextState] = useState('');
    const items = itemList.map((item, index) => {
        return (
            <TodoListItem item={item} key={index} index={index} handleChecked={i => handleChecked(i)} delete={i => deleteTodo(i)} />
        );
    });
    const addTodo = () => {
        const newItemList = itemList.slice();
        newItemList.push({ text: textState, checked: false });
        setItemList(newItemList);
        setTextState('');
    }
    const deleteTodo = (i) => {
        const newItemList = itemList.slice();
        newItemList.splice(i, 1);
        setItemList(newItemList);
    }
    const handleOnChangeText = (event) => {
        setTextState(event.target.value);
        // console.log(textState);
    }
    const handleChecked = (i) => {
        const newItemList = itemList.slice();
        newItemList.splice(i, 1, { text: newItemList[i].text, checked: !newItemList[i].checked });
        setItemList(newItemList);
    }
    const keyPress = (e) => {
        if (e.keyCode === 13) {
            addTodo();
        }
    }

    return (
        <div className={classes.root}>
            <Typography variant='h6' className={classes.title}>
                ToDo
            </Typography>
            <List component="nav">
                {items}
                <ListItem className={classes.form}>
                    <TextField label="ToDo" value={textState} onChange={event => handleOnChangeText(event)} onKeyDown={event => keyPress(event)} className={classes.textField} />
                    <Button variant='outlined' onClick={() => addTodo()}>add</Button>
                </ListItem>
            </List>
        </div>
    );
}

export default TodoList;