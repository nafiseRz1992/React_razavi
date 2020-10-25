import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root1: {
        backgroundColor: 'white',
        width:'30%',
        padding:'5rem '
    },
    img:{
        border_radios:'50%'
    },
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },

}));
export default useStyles;