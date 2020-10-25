import React from 'react';
import SubmitForm from "./SubmitForm";
import {paper} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'white',
        width: '70%'
    },
    pageContent: {
        margin: theme.spacing(5),
        padding:theme.spacing(3)
    }

}));

const RightSidebar = ({onFormChange,onInputChange,errors,...values}) => {
    const Classes= useStyles();
    return (


    <div className={Classes.root}>
       <paper className={Classes.pageContent}>
           <SubmitForm  onFormChange={onFormChange} onInputChange={onInputChange} {...values} errors={errors}  />

       </paper>


    </div>


);
};

export default RightSidebar;






