import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

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
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function SimpleList() {
    const [state, setState] = useState({
        checkedA: false,
        checkedB: false,
        checkedF: false,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List component="nav">
                <ListItem>
                    <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange('checkedA')}
                        value="checkedA"
                        // color="primary"
                        // indeterminate
                        inputProps={{
                            'aria-label': 'primary checkbox',
                        }}
                    />
                    <ListItemText primary="Inbox" />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Drafts" />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Trash" />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Spam" />
                </ListItem>
            </List>
        </div>
    );
}

class ToDo extends React.Component {
    render() {
        return (
            <div className={useStyles.root}>
                <Typography variant="body1">
                    body1
                </Typography>
                <Typography variant="body2">
                    body2
                </Typography>
            </div>
        );
    }
}

// export default ToDo;
export default SimpleList;