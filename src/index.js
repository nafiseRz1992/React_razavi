import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Theme from "./components/theme";



ReactDOM.render(
    <ThemeProvider theme={Theme}>


  <React.StrictMode>
    <App/>
  </React.StrictMode>
    </ThemeProvider>,
  document.getElementById('root')
);

