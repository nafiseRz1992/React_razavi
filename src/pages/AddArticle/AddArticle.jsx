import React from "react";
import TextField from "@material-ui/core/TextField";
import Button  from "components/Button";
import { useForm } from "react-hook-form";
import {useState} from "react"
import Page from 'components/Page';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
 Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  Container,
  Grid
} from '@material-ui/core';
import { storage } from 'services';
import * as firebase from "services";

//import { Card, CardBody, Form, FormInput } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  root2: {},
  avatar: {
    height: 100,
    width: 100
  }

}));

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

export default function AddArticle({ className,props, ...rest }) {
  const { register, errors, reset, handleSubmit } = useForm();
const [url,seturl]=useState("");
var [image, setImage] = useState(null) ;
const classes = useStyles();
const handlefilechange= e=>{
  if(e.target.files[0]){
    setImage(e.target.files[0])
  }}
/*const onUploadclick=()=>{
  const uploadTask = storage.ref(`images/${image.name}`).put(image);
  uploadTask.on(
    "state_changed",
    snapshot=>{},
    error=>{
      console.log(error);
    },
    ()=>{
      storage.ref("images").child(image.name).getDownloadURL()
      .then(url=>{
        console.log(url);
        seturl(url)
      });
    }
    
    )
}
*/
const onSubmit = article => {
  var storageRef = storage.ref(`images/${image.name}`);
  var task = storageRef.put(image);
  task.on('state_changed', function progress(snapshot) {
    var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
  //  uploader.value = percentage;
  console.log('pp'+percentage);
  
  }, function (error) {
    console.error(error);
  
  },function () {
    task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at',downloadURL);
       // const createMenuForm = document.querySelector('#mydropzone');
       // createMenuForm.addEventListener('submit', (e) => {
      
        firebase.db.ref("/articles").push( {
          title:article.title,
          body:article.body,  
          imageURL: downloadURL,        
         imgName:image.name,
         date: new Date(),
         
  }
  
  ).then(
    console.log("push shod")
  ).catch(err => {
  console.log(err.message);
  });
 
  });
  });
};

 
      
 
 
  


  return (
    <Page
    className={classes.root}
    title="Account"
  >
    <Container maxWidth="lg">
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={4}
          md={6}
          xs={12}
        >
   <Card
      className={clsx(classes.root2, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
       
          <Typography
            color="textSecondary"
            variant="body1"
          >
           picture for your Article
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment().format('hh:mm A')} ${user.timezone}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
         variant="contained"
         component="label"
          color="primary"
          fullWidth
         
        >
          Upload picture
          <input
          type="file"
          hidden
          onChange={handlefilechange}
          id="fileButton"
          />
        </Button>

 
      </CardActions>
    </Card>
    </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
       <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2} style={{ marginTop: 16 }}>
        <Grid item xs={12}>
          
          <TextField
            name="title"
            label="Title"
            defaultValue=""
            variant="outlined"
            fullWidth
            inputRef={register({
              required: "Title is required",
              maxLength: {
                value: 250,
                message: "Title must be less than 250 characters"
              }
            })}
            error={!!errors.title}
            helperText={!!errors.title && errors.title.message}
          />
        </Grid>
        <Grid item xs={12}>
        <TextField
            name="body"
            label="Body"
            defaultValue=""
            variant="outlined"
            multiline
            fullWidth
            inputRef={register({ required: "Body is required" })}
            error={!!errors.body}
            helperText={!!errors.body && errors.body.message}
          />
       
        </Grid>
        

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginRight: 8 }}
          >
            Submit
          </Button>
          <Button variant="contained" type="reset" onClick={reset}>
            Reset
          </Button>
   
        </Grid>
      </Grid>
    </form>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

AddArticle.propTypes = {
  className: PropTypes.string
};