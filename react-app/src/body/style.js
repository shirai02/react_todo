import { makeStyles } from '@material-ui/core/styles'

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

export default useStyles;