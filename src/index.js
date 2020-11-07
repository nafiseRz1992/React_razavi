import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";
import AuthProvider from './provider/AuthProvider'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
  <AuthProvider>
  <React.StrictMode>
    <App />
    </React.StrictMode>
  </AuthProvider>
</BrowserRouter>,
 
  
  document.getElementById("root")
);
