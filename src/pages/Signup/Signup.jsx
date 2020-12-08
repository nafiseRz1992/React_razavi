import React from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "components/Button";
//import { useAuth } from "providers/auth";
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import axios from 'axios';
import Thecontext from "components/Thecontext";


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
  },
  root: {
    minWidth: 275,
    marginTop: theme.spacing(9)
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const history = useHistory();
  const [updateList, setUpdateList] = React.useState(false);
  const [haveToken, setHaveToken] = React.useState(0);
  const [userlogined, setUserlogined] = React.useState();
  const bull = <span className={classes.bullet}>•</span>;
  // const { signUp } = useAuth();
  const [state, setState] = React.useState({
    name: "",
    userName: "",
    password: ""
  });
  const [loading, setLoading] = React.useState(false);
  let [users, setusers] = React.useState([]);
  const handleChange = e => {
    const {name, value} = e.target;
    setState(st => ({...st, [name]: value}));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const {name, userName, password} = state;
    if (!state) {
      return;
    }
    axios.post(`/auth/register`, {
      name,
      userName,
      password,
    })
      .then(function (Response) {
        if (Response.data.token) {
          setHaveToken(1)
          localStorage.setItem('ACCESS_TOKEN_NAME', Response.data.token);
        }
        if (Response.data.user) {
          let user = Response.data.user;
          console.log(user);
          localStorage.setItem('USER',JSON.stringify(user));
          setUserlogined({user});
        }
        console.log(userlogined);
        history.replace("/dashboard");
      })
      .catch(function (error) {
        console.info(error);
      });
  }

  // const toggleUpdateList = () => setUpdateList(current => !current);
  return (

    <Container component="main" maxWidth="xs">
      <Card className={classes.root}>
        <CardContent>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                value={state.name}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="userName"
                name="userName"
                autoComplete="userName"
                value={state.userName}
                onChange={handleChange}
              />
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
                value={state.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                loading={loading}
                onClick={handleSubmit}
              >
                Sign Un
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signin" variant="body2">
                    {"ورود"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </CardContent>
      </Card>
    </Container>

  );
}
