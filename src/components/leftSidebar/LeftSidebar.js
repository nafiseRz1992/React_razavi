import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import 'fontsource-roboto';
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
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    context:{
        margin_left:theme.spacing(5),
        padding:theme.spacing(5)
    }


}));


const LeftSidebar = ({...values}) => {
    const Classes =useStyles();

    if (values.submitted) {
        return (



            <div className={Classes.root1}>
                <div className={Classes.root}>
                    <Avatar alt="Remy Sharp" src={values.avatar} className={Classes.large}>Image</Avatar>
                </div>

                <div  className={Classes.context}>

                     <Typography variant="subtitle1" gutterBottom>{values.firstName}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{values.lastName}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{values.email}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{values.phone}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{values.birthDate}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{values.title}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{values.gender}</Typography>
                    <Typography variant="subtitle1" gutterBottom>{values.address}</Typography>
                </div>



            </div>


        );
    }
    return (



        <div className={Classes.root1}>
            <div className={Classes.root}>
                <Avatar  className={Classes.large}>Image</Avatar>
            </div>




        </div>


    );
};

export default LeftSidebar;