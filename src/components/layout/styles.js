import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        height :'100vh',
        width :'100%',
        overflow: 'hidden'
    },
    RightSidebar:{
        backgroundColor: '#BDC3C7',
        width: '70%'

    },
    LeftSidebar:{
        backgroundColor: '#BDC3C7',
        width:'30%'
    },
    divider:{
        height: '100%',
        width:1,
        backgroundColor:"#7EBAFF !important",
        filter : "opacity(0.5)"

    },
    root1: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));
export default useStyles;