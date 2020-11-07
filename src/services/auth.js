import { auth } from "./firebase";


//let authenticated = false;

export function signin(email, password,setErrors,setToken) {
  return auth.signInWithEmailAndPassword(email, password)
   .then( async res => {
        const token = await Object.entries(res.user)[5][1].b
          //set token to localStorage 
          await localStorage.setItem('token', token)
        
          setToken(window.localStorage.token)
            console.log(res)
      })
      .catch(err => {
        setErrors(prev => ([...prev, err.message]))
      })
}

export function signup(email, password, name,setErrors,setToken) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(async user => {
      if (!!user) {
        await auth.currentUser.updateProfile({ displayName: name });
      }
      
      return user;
    })
    .then( async res => {
      const token = await Object.entries(res.user)[5][1].b
        //set token to localStorage 
        await localStorage.setItem('token', token)
        //grab token from local storage and set to state. 
        setToken(window.localStorage.token)
      console.log(res)
    })
    .catch(err => {
      //saving error messages here
       setErrors(prev => ([...prev, err.message]))
     })
   
}
export function signout(setErrors,setToken) {
 // return auth.signOut()
   // signOut is a no argument function
    
     auth().signOut().then( res => {
      //remove the token
      localStorage.removeItem('token')
        //set the token back to original state
        setToken(null)
     })
     .catch(err => {
      //there shouldn't every be an error from firebase but just in case
      setErrors(prev => ([...prev, err.message]))
      //whether firebase does the trick or not i want my user to do there thing.
        localStorage.removeItem('token')
          setToken(null)
            console.error(err.message)
    })
    }

//export function isAuthenticated() {
 // return authenticated;
//}

