import React from 'react'
import { useEffect, useState } from "react";
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
import jalaliMoment from "jalali-moment";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
  table: {},
}));


const TheEntry = (props) => {
  let [checked, setChecked] = useState(0);

  const { entries } = props;

  const handleToggle = (event, id) => {
    let newSelected = checked;

    if (id !== checked) {
      newSelected = id;
    } else {
      newSelected = 0;
    }
    setChecked(newSelected);
  };

  const classes = useStyles();

  const displayDate = (t) => {
    return jalaliMoment.unix(t / 1000).format('jYYYY/jMM/jDD')
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>شناسه</TableCell>
            <TableCell align="right">عنوان</TableCell>
            <TableCell align="right">تاریخ</TableCell>
            <TableCell align="right">مقدار</TableCell>
            <TableCell align="right">دسته</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>
        <TableBody>
          {entries && entries.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{displayDate(row.date)}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.category.name}</TableCell>
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
  );
}
export default TheEntry;
