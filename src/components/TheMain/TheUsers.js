import React from 'react'
import { useEffect , useState } from "react";
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from "@material-ui/core/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import axios from 'axios';
import TheContext from 'components/Thecontext';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 500,
    overflow: 'scroll',
    backgroundColor: theme.palette.background.paper,
  },
  table: {},
}));

const TheUsers = (props) => {
  let [users, setUsers] = useState([]);
  let [checked, setChecked] = useState(0);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateList, setUpdateList] = React.useState(false);
  const [newuserName, setnewuserName] = React.useState('');
  //const [cancleFilter, setcancleFilter] = React.useState(0);

  const submit = () => {
    setOpen(false);
    axios.post('/api/users', {
      name: newuserName,
    })
      .then(function (response) {
        setnewuserName('');
        toggleUpdateList();
      })
      .catch(function (error) {
        console.info(error);
      });
  };

  const editSubmit = () => {
    setOpenEdit(false);
    axios.post(`/api/users/edit?userId=${checked}`, {
      name: newuserName,
    })
      .then(function (response) {
        setnewuserName('');
        setChecked(0);
        toggleUpdateList();
      })
      .catch(function (error) {
        console.info(error);
      });
  };

  const deleteSubmit = (id) => {
    setOpenEdit(false);
    axios.post(`/api/users/delete?userId=${id}`)
      .then(function (response) {
        toggleUpdateList();
      })
      .catch(function (error) {
        console.info(error);
      });
  };

  const toggleUpdateList = () => setUpdateList(current => !current);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setnewuserName('');
  };

  const handleCloseEdit = (value) => {
    setOpenEdit(false);
    setnewuserName('');
  };

  const handleEdit = (event, item) => {
    setnewuserName(item.name);
    setChecked(item.id);
    handleClickOpenEdit();
  };

  const { setCheckedUser } = props;

  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(json => {
        setUsers(json)
      })
  }, [updateList])

  const handleToggle = (event, id) => {
    let newSelected = checked;
    if (id !== checked) {
      newSelected = id;
    }
    setChecked(newSelected);
    setCheckedUser(newSelected);
   
  };
  const deleteFilter= () =>{
    setChecked(0);
    setCheckedUser(0);
  }

  

  const classes = useStyles();

  return (
    <TheContext.Provider value={{useridSelected: checked}} className={classes.root}>
      <TableContainer component={Paper}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          افزودن کاربر جدید
        </Button>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>شناسه</TableCell>
              <TableCell align="right">نام</TableCell>
              <TableCell align="right">نام کاربری</TableCell>
              <TableCell align="right"/>
              <TableCell align="right"/>
              <TableCell align="right">
              <IconButton
                    
                    onClick={deleteFilter}
                    aria-label="CancelOutlinedIcon"
                     color="secondary">
                    <CancelOutlinedIcon align="right" />
                  </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.userName}</TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(event) => handleEdit(event, row)}
                    aria-label="edit"
                    className={classes.margin}>
                    <EditIcon fontSize="small"/>
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(event) => deleteSubmit(row.id)}
                    aria-label="delete"
                    className={classes.margin}
                    color="secondary">
                    <DeleteIcon fontSize="small"/>
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                
                <FormControlLabel
                    control={<Radio/>}
                    checked={checked === row.id}
                    tabIndex={-1}
                    disableRipple
                    onClick={(event) => handleToggle(event, row.id) }
                    label={''}
                  />
                 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={open}>
        <DialogTitle id="simple-dialog-title">افزودن کاربر جدید</DialogTitle>
        <form
          className={classes.form}
          noValidate
          autoComplete="off">
          <TextField
            id="outlined-basic"
            label="عنوان"
            variant="outlined"
            value={newuserName}
            onChange={e => setnewuserName(e.target.value)}/>
        </form>
        <div className="my-2"/>
        <Grid container spacing={0}>
          <Grid xs={12} md={6} lg={6} xl={6}>
            <Button
              fullWidth
              variant="outlined"
              color="primary" onClick={handleClose}>
              انصراف
            </Button>
          </Grid>
          <Grid xs={12} md={6} lg={6} xl={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary" onClick={submit}>
              تایید
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      <Dialog
        onClose={handleCloseEdit}
        aria-labelledby="simple-dialog-title"
        open={openEdit}>
        <DialogTitle id="simple-dialog-title">ویرایش کاربر</DialogTitle>
        <form
          className={classes.form}
          noValidate
          autoComplete="off">
          <TextField
            id="outlined-basic"
            label="عنوان"
            variant="outlined"
            value={newuserName}
            onChange={e => setnewuserName(e.target.value)}/>
        </form>
        <div className="my-2"/>
        <Grid container spacing={0}>
          <Grid xs={12} md={6} lg={6} xl={6}>
            <Button
              fullWidth
              variant="outlined"
              color="primary" onClick={handleCloseEdit}>
              انصراف
            </Button>
          </Grid>
          <Grid xs={12} md={6} lg={6} xl={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary" onClick={editSubmit}>
              تایید
            </Button>
          </Grid>
        </Grid>
      </Dialog>
    </TheContext.Provider>
  );
}
export default TheUsers;
