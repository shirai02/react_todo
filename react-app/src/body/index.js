import React from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
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
    },
}));

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

function SimpleList() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button>
                    <ListItemText primary="Trash" />
                </ListItem>
                <ListItemLink href="#simple-list">
                    <ListItemText primary="Spam" />
                </ListItemLink>
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