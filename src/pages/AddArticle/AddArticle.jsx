import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "components/Button";
import { ArticleService } from "components/Article";
import { useForm } from "react-hook-form";

export default function AddArticle(props) {
  const { register, errors, reset, handleSubmit } = useForm();


  const onSubmit = article => {
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
  );
}
