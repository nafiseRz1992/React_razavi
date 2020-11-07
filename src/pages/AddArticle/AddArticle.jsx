import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ArticleService } from "components/Article";
import { useForm } from "react-hook-form";
import React, {useContext} from 'react';
import {firebaseAuth} from '../provider/AuthProvider'


export default function AddArticle() {
  const [article, setArticle] = React.useState({ title: "", body: "" });
  const { register, handleSubmit, errors } = useForm();
  const {signout,} = useContext(firebaseAuth)

/*
  const handleChange = e => {
    const { name, value } = e.target;
    setArticle(state => ({ ...state, [name]: value }));
  };
  
*/
  const onSubmit = () => { 
    ArticleService.create(article)
      .then(() => alert("done"))
      .catch(error => console.log(error));
  }; 
  
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Grid container spacing={2} style={{ marginTop: 16 }}>
      <Grid item xs={12}>
        <TextField
          name="title"
          fullWidth
          variant="outlined"
          label="Title"
          //value={article.title}
          //onChange={handleChange}
          ref={register}
        />
         {errors.title && <p>this is required </p>}
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="body"
          fullWidth
          variant="outlined"
          label="Body"
          multiline
         // value={article.body}
         // onChange={handleChange}
          ref={register}
        />
         {errors.body && <p>this is required </p>}
      </Grid>
      <Grid item xs={12}>
        <Button  type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
      <button onClick={signout}>sign out </button>
    </Grid>
    </form>
  );
}
