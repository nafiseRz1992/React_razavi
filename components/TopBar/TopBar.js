import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink, useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white'
  }
}));

export default function TopBar(props) {
  const classes = useStyles();
  const history = useHistory();

  const signout = () => {
    localStorage.clear();
    history.push('/signin');
  }

  const {user} = props;

  console.info(user);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Home
          </Typography>
          <nav>
            {!!user && (
              <Link
                variant="button"
                color="white"
                component={RouterLink}
                to="/profile"
                className={classes.link}
              >
                <span>{user.name}</span>
                <IconButton>
                  <AccountCircleIcon/>
                </IconButton>
              </Link>
            )}
          </nav>
          {!!user ? (
            <Link
              variant="button"
              color="white"
              component={RouterLink}
              to="/signin"
              onclick={signout}
              className={classes.link}
            >
              <IconButton>
                <PowerSettingsNewIcon/>
              </IconButton>
            </Link>
          ) : (
            <Button variant="contained" component={RouterLink} to="/signin">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
