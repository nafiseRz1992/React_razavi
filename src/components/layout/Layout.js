import React ,{useState} from 'react';
import useStyles from "./styles";
import LeftSidebar from "../leftSidebar/LeftSidebar";
import RightSidebar from "../rightSidebar/RightSidebar";
import {Divider} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
const initialFValues ={
    submitted: false,
    avatar: null,
    id:0,
    firstName: '',
    lastName:'',
    phone:'',
    email:'',
    birthDate:'',
    title:'',
    displayEmail:true,
    gender:'male',
    address:''
}

const Layout = () => {
    const Classes= useStyles();
    const [formState,formSetstate]=useState(initialFValues)
    const [errors,seterrors]=useState({})

    const validate =()=>{
        let temp={}
        temp.firstName = formState.firstName?"":"This field is reguired"
        temp.lastName = formState.lastName?"":"This field is reguired"
        temp.email = (/[^@]+@[^.]+..+/).test(formState.email)?"":"email is not valid"
        temp.phone = (/09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}/).test(formState.phone)?"":"phone is not valid"
        temp.birthDate = (/^[0-9]{4}([- /.])(((0[13578]|(10|12))\\1(0[1-9]|[1-2][0-9]|3[0-1]))|(02\\1(0[1-9]|[1-2][0-9]))|((0[469]|11)\\1(0[1-9]|[1-2][0-9]|30)))$/
        ).test(formState.birthDate) ?"":"birthdate is not valid"


        seterrors({
            ...temp
        })
        return Object.values(temp).every(x => x == "")
    }

    const handleChange =e =>{
        const {name , value} = e.target
        formSetstate({
            ...formState,
            [name]:value
        })



    }
    const  formChanged =val =>{

        formSetstate({
            ...formState,
            submitted: true})
        val.preventDefault()

    }
    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            formSetstate({
                ...formState,
                avatar: URL.createObjectURL(img)
            })
        }

    };



        const values = {
            submitted:formState.submitted,
            avatar:formState.avatar,
            firstName: formState.firstName,
            lastName: formState.lastName,
            email:formState.email,
            phone:formState.phone,
            birthDate:formState.birthDate,
            title:formState.title,
            displayEmail:formState.displayEmail,
            gender:formState.gender,
            address:formState.address

        }



    return (


        <div  className={Classes.root} className={Classes.root1}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" className={Classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                      Nafise Razavi 02
                    </Typography>
                </Toolbar>
            </AppBar>
        <div className={Classes.root} direction={"row-reverse"}>
            <LeftSidebar   {...values}/>

            <Divider orientation={"vertical"} className={Classes.divider}/>

            <RightSidebar  onFormChange={formChanged}
                           onInputChange={handleChange} onInputChangepic={onImageChange} {...values}  errors={errors}/>
                }

         </div>

        </div>
    );
};

export default Layout;