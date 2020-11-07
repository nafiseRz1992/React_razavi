import React from "react";
import {route, Redirect} from "react-router-dom"
import { signin, signout, signup } from 'services';
import React, {useContext} from 'react';
import {firebaseAuth} from '../provider/AuthProvider'

const { token } = useContext(firebaseAuth)
export default function privateRoute ({Component:Component,...rest}) {
  return (
  <route
  {...rest}
  render={props =>{
      if(token !== null){
          return <Component {...props}/>;
      }
      else{
          return(
              <Redirect
              to={
                  {
                      pathname:"/signin",
                     state: {
                     from: Signin
                      },
                  }
              }
              />
          );
      }
  }}
  />
  )
 
   
  };

