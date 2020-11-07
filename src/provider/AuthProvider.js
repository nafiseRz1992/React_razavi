import SignIn from 'pages/Signin/Signin';
import React ,{useState}  from 'react';
import { signin, signout, signup } from 'services';




const [state, setState] = React.useState({
    name: "",
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState([])
  const [token, setToken] = useState(null)
export const firebaseAuth = React.createContext()

const AuthProvider = (props) => {
    return (
        <firebaseAuth.Provider
        value={{
            handleSignup,
            handleSignin,
            token,
            state,
            setState,
            errors,
            handleSignout,
            
        }}>
          {props.children}
    
        </firebaseAuth.Provider>
      );
};
const handleSignup = () => {
    // middle man between firebase and signup 
 return signup(state.email,state.password,setErrors,setToken)
  }
  const handleSignin = () => {
    // middle man between firebase and signup 
 return signin(state.email,state.password,setErrors,setToken)
  }
  const handleSignout  = () => {
    // middle man between firebase and signup 
 return signout()
  }

export default AuthProvider;
