import React, {useState,useEffect,useRef} from 'react';
import {Grid,makeStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';





const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    formRoot:{
        '& .MuiFormLabel-root':{
           width:'80%',
            margin:theme.spacing(1)
        }
    },
    input: {
        display: 'none',

    },
    inputs:{
        margin:theme.spacing(1)
    }

}));
const GreenRadio = withStyles({
    root: {
        color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);
const SubmitForm = ({onFormChange,onInputChange,onInputChangepic,errors,...values}) => {
    const Classes=useStyles();


    const handleInputChange = e => {

        onInputChange(e)

    }

    const handleInputChangepic = e => {

        onInputChangepic(e)

    }


    const  handleSubmit=event=> {
        onFormChange(event)



    }
    const form = useRef();

    return (

        <ValidatorForm  ref={form}  className={Classes.root} className={Classes.formRoot} autoComplete="off"   onSubmit={handleSubmit}>
            <FormLabel component="legend">Submit Form</FormLabel>
            <Grid container  direction={"row-reverse"} direction={"ltr"}>
                <div className={Classes.root}>
                    <input
                        accept="image/*"
                        className={Classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        name="avatar"
                        onChange={handleInputChangepic}


                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="secondary" component="span">
                          CHANGE PICTURE
                        </Button>
                    </label>
                    <input accept="image/*" className={Classes.input} id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                        <IconButton color="secondary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
            </Grid>

            <Grid container>




                    <TextValidator className={Classes.inputs}
                        id="outlined-basic"
                        label="firstName"
                        variant="outlined"
                        value={values.firstName}
                        name="firstName"
                        onChange={handleInputChange}
                        helperText={errors.firstName}
                        validators={['required']}
                        errorMessages={['this field is required']}


                    />
                    <TextValidator  className={Classes.inputs}
                        id="outlined-basic"
                   variant="outlined"
                   label="lastName"
                   name="lastName"
                   value={values.lastName}
                   onChange={handleInputChange}
                   helperText={errors.lastName}
                   validators={['required']}
                   errorMessages={['this field is required']}/>

                   <TextValidator  className={Classes.inputs}
                  id="outlined-basic"
                  label="phone"
                  variant="outlined"
                value={values.phone}
                name="phone"
                onChange={handleInputChange}
                helperText={errors.phone}
                  validators={['required','isNumber']}
                  errorMessages={['this field is required','phone is not valid']}/>
                <TextValidator  className={Classes.inputs}
                id="outlined-basic"
                label="email"
                variant="outlined"
                value={values.email}
                name="email"
                onChange={handleInputChange}
                helperText={errors.email}
                validators={['required','isEmail']}
                errorMessages={['this field is required','email is not valid']}
               />
            <TextField  className={Classes.inputs}
                id="outlined-basic"
                label="birthDate"
                variant="outlined"
                value={values.birthDate}
                name="birthDate"
                onChange={handleInputChange}
                helperText={errors.birthDate}
                validators={['isDate']}
                errorMessages={[ 'birthDate is not valid']}/>
            <TextField  className={Classes.inputs}
                id="outlined-basic"
                label="title"
                variant="outlined"
                value={values.title}
                name="title"
                onChange={handleInputChange}/>

                    <FormControl component="fieldset">

                        <RadioGroup row aria-label="position" name="position" defaultValue="top">
                            <FormLabel component="legend">Gender</FormLabel>
                            <FormControlLabel
                                checked={values.gender === 'Mail'}
                                onChange={handleInputChange}
                                value="Mail"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'A' }}
                                control={<Radio color="primary" />}
                                label="Mail"
                                labelPlacement="start"
                                name="gender"
                            />
                            <FormControlLabel
                                checked={values.gender === 'Femail'}
                                onChange={handleInputChange}
                                value="Femail"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'B' }}
                                control={<Radio color="primary" />}
                                label="Femail"
                                labelPlacement="start"
                                name="gender"
                            />
                            <FormControlLabel
                                checked={values.gender === 'Other'}
                                onChange={handleInputChange}
                                value="Other"
                                name="radio-button-demo"
                                inputProps={{ 'aria-label': 'C' }}
                                control={<Radio color="primary" />}
                                label="Other"
                                labelPlacement="start"
                                name="gender"
                            />


                        </RadioGroup>
                    </FormControl>
                    <TextField
                        id="outlined-full-width"
                        label="Address"
                        style={{ margin: 8 }}
                        placeholder="Address"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        name="address"
                        value={values.address}
                        onChange={handleInputChange}
                    />


                <Grid container  direction={"row-reverse"} direction={"ltr"}>

                    <Button variant="contained"  value="Submit" type="submit" >
                        SUBMIT
                    </Button>

                </Grid>
            </Grid>


        </ValidatorForm>
    );
};

export default SubmitForm;