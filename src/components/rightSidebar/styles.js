import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        width: '70%'
    },


    pageContent: {
      margin: theme.spacing(10),
        padding:theme.spacing(10)
    }

}));
export default useStyles;