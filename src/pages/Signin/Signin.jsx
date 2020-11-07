import React ,{useContext}from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "components/Button";
import { signin } from "services";
import { useForm } from "react-hook-form";
import {firebaseAuth,state,setState} from './provider/AuthProvider'
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
export default withRouter(SignIn);
 function SignIn(props) {
  const classes = useStyles();
 // const [state, setState] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const { register,handleSubmit,errors} = useForm();
  const {handleSignin} = useContext(firebaseAuth);
  console.log(handleSignin)
/*
  const handleChange = e => {
    const { name, value } = e.target;
    setState(s => ({ ...s, [name]: value }));
  };*/
 
  const onSubmit = e => {
    //e.preventDefault();
    setLoading(true);
    //const { email, password } = state;
     handleSignin()
    props.history.push('/')
    setLoading(false)
      
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            //value={state.email}
           // onChange={handleChange}
            ref ={ register({ required: true}) }
          />
        {errors.email && errors.email.type === "required" && <p>this is required </p>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
           // value={state.password}
          //  onChange={handleChange}
            ref ={  register({ required: true
           })}
          />
      {errors.email && errors.email.type === "required" && <p>this is required </p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            
            loading={loading} 
            
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
