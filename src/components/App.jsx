import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Signin from "pages/Signin";
import Signup from "pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from "@material-ui/core";
import PrivateRoute from "components/helpers/PrivateRoute";
import Dashboard from "pages/dashboard/Dashboard";

const theme = createMuiTheme({
  typography: {
    fontFamily: 'IRANYekan',
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <ToastContainer/>
      <Router>
        <Switch>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/signup" component={Signup}/>
          <PrivateRoute exact  path={["/","/dashboard"]} component={Dashboard}/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

