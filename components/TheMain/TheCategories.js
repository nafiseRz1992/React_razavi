import React from 'react'
import { useEffect, useRef, useState } from "react";
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
import Thecontext from 'components/Thecontext';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import axios from 'axios';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'scroll',
    height: 500,
    backgroundColor: theme.palette.background.paper,
  },
  table: {},
  form: {
    width: '100%',
    padding: 20,
  },
}));

const TheCategories = (props) => {
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState(0);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [updateList, setUpdateList] = React.useState(false);
  const [newCategoryName, setNewCategoryName] = React.useState('');

  const submit = () => {
    setOpen(false);
    axios.post('/api/categories', {
      name: newCategoryName,
    })
      .then(function (response) {
        setNewCategoryName('');
        toggleUpdateList();
      })
      .catch(function (error) {
        console.info(error);
      });
  };

  const editSubmit = () => {
    setOpenEdit(false);
    axios.post(`/api/categories/edit?categoryId=${checked}`, {
      name: newCategoryName,
    })
      .then(function (response) {
        setNewCategoryName('');
        setChecked(0);
        toggleUpdateList();
      })
      .catch(function (error) {
        console.info(error);
      });
  };

  const deleteSubmit = (id) => {
    setOpenEdit(false);
    axios.post(`/api/categories/delete?categoryId=${id}`)
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
    setNewCategoryName('');
  };

  const handleCloseEdit = (value) => {
    setOpenEdit(false);
    setNewCategoryName('');
  };

  const handleEdit = (event, item) => {
    setNewCategoryName(item.name);
    setChecked(item.id);
    handleClickOpenEdit();
  };

  const {setCheckedCat} = props;

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(json => {
        setCategories(json);
      })
  }, [updateList])

  const handleToggle = (event, id) => {
    let newSelected = checked;
    if (id !== checked) {
      newSelected = id;
    }
    setChecked(newSelected);
    setCheckedCat(newSelected);
  };

  const deleteFilter= () =>{
    setChecked(0);
    setCheckedCat(0);
  }
  const classes = useStyles();

  return (
    <Thecontext.Provider value={{categoryidSelected: checked}}>
      <TableContainer component={Paper}>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          افزودن دسته بندی جدید
        </Button>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>شناسه</TableCell>
              <TableCell align="right">دسته بندی</TableCell>
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
            {categories && categories.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
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
                    className={classes.margin}>
                    <DeleteIcon fontSize="small"
                    color="secondary"/>
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <FormControlLabel
                    control={<Radio/>}
                    checked={checked === row.id}
                    tabIndex={-1}
                    disableRipple
                    onClick={(event) => handleToggle(event, row.id)}
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
        <DialogTitle id="simple-dialog-title">افزودن دسته بندی جدید</DialogTitle>
        <form
          className={classes.form}
          noValidate
          autoComplete="off">
          <TextField
            id="outlined-basic"
            label="عنوان"
            variant="outlined"
            value={newCategoryName}
            onChange={e => setNewCategoryName(e.target.value)}/>
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
        <DialogTitle id="simple-dialog-title">وبرایش دسته بندی </DialogTitle>
        <form
          className={classes.form}
          noValidate
          autoComplete="off">
          <TextField
            id="outlined-basic"
            label="عنوان"
            variant="outlined"
            value={newCategoryName}
            onChange={e => setNewCategoryName(e.target.value)}/>
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
    </Thecontext.Provider>
  );
}
export default TheCategories;
