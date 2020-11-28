import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Checkbox, TextField, Button, ButtonGroup } from '@material-ui/core';
import red from '@material-ui/core/colors/red'
import { Dehaze } from '@material-ui/icons';
import useStyles from './style';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend }from "react-dnd-touch-backend"
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './Constants';
import update from 'immutability-helper';
import { isMobile } from 'react-device-detect';

//ToDo Grid Layout使う
//ToDo editいる？
//todo 一括削除
//! classを使用しない
//! 子要素をmapで展開するならStateは親要素で管理しないとおかしくなる

function TodoListItem(props) {
    const classes = useStyles();
    const [textState, setTextState] = useState(props.item.text);
    const handleOnChangeText = (event) => {
        setTextState(event.target.value);
    }
    const keyPress = (e) => {
        if (e.keyCode === 13) {
            props.setEdit(props.index, false, textState);
        }
    }
    const [{isDragging}, drag] = useDrag({
        item: { type: ItemTypes.LISTITEM, index: props.index },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })
    const ref = useRef(null)
    const [,drop] = useDrop({
        accept: ItemTypes.LISTITEM,
        hover(item,monitor){
            if(!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = props.index;
            if(dragIndex == hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // console.log(clientOffset);
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            props.moveItem(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        }
    })
    const style = ({isDragging}) => ({
        boxShadow: isDragging ? "0px 5px 5px 0px rgba(0, 0, 0, .5)":"",
    });
    drag(drop(ref));
    return (
        <React.Fragment>
            <div ref={ref} style={style({isDragging})}>
                <ListItem>
                    <Dehaze />{style}
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
                    {props.item.edit ? (
                        <TextField defaultValue={props.item.text} onChange={event => handleOnChangeText(event)} onKeyDown={event => keyPress(event)} 
                        className={classes.textField + ' ' + classes.del_underline} borderBottom={0} />
                    ) : (
                            <ListItemText primary={props.item.text} style={{ textDecoration : props.item.checked ? 'line-through' : 'none' }} onClick={() => props.setEdit(props.index, !props.item.edit, textState)} />
                        )
                    }
                    {props.item.checked ? (
                            <Button color="secondary" variant='outlined' style={{ color: red[800] }} onClick={() => props.delete(props.index)}>
                                delete
                        </Button>
                    ) : null
                    }
                </ListItem>
                <Divider />
            </div>
        </React.Fragment >
    )
}

function TodoList() {
    const classes = useStyles();
    // const userAgent = req.headers['user-agent'];
    const [itemList, setItemList] = useState(
        [
            { id:1, text: 'Drafts', checked: false, edit: false },
            { id:2, text: 'Trash', checked: false, edit: false },
            { id:3, text: 'Spam', checked: false, edit: false },
        ]
    );
    const moveItem = useCallback((dragIndex, hoverIndex) => {
        const dragItem = itemList[dragIndex];
        setItemList(update(itemList, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, dragItem],
            ],
        }));
    }, [itemList]);
    const [textState, setTextState] = useState('');
    const items = itemList.map((item, index) => {
        return (
            <TodoListItem moveItem={moveItem} item={item} key={item.id} index={index} handleChecked={i => handleChecked(i)} 
            setEdit={(i, state, text) => setEdit(i, state, text)} delete={i => deleteTodo(i)} />
        );
    });
    const addTodo = () => {
        const newItemList = itemList.slice();
        const digest = new Date().toLocaleString();
        newItemList.push({id: digest, text: textState, checked: false });
        setItemList(newItemList);
        setTextState('');
        console.log(digest);
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
        newItemList.splice(i, 1, { text: newItemList[i].text, checked: !newItemList[i].checked, edit: newItemList[i].edit });
        setItemList(newItemList);
    }
    const setEdit = (i, state, text) => {
        const newItemList = itemList.slice();
        if (state) {
            newItemList.splice(i, 1, { text: newItemList[i].text, checked: newItemList[i].checked, edit: state });
        } else {
            newItemList.splice(i, 1, { text: text, checked: newItemList[i].checked, edit: state });
        }
        setItemList(newItemList);
        // console.log(text);
    }
    const keyPress = (e) => {
        if (e.keyCode === 13) {
            addTodo();
        }
    }

    return (
        <div className={classes.root}>
            <Typography variant='h6' className={classes.title}>
                ToDo {isMobile ? 'mobile' : 'PC'}
            </Typography>
            <List component="nav">
                <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
                    {items}
                </DndProvider>
                <ListItem className={classes.form}>
                    <TextField label="ToDo" value={textState} onChange={event => handleOnChangeText(event)} onKeyDown={event => keyPress(event)} className={classes.textField} />
                    <Button variant='outlined' onClick={() => addTodo()}>add</Button>
                </ListItem>
            </List>
        </div>
    );
}

export default TodoList;