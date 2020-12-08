import React from 'react'
import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TheCategories from "../../components/TheMain/TheCategories"
import TheUsers from '../../components/TheMain/TheUsers';
import DashboardContainer from '../../components/DashboardContainer';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Calendar } from '../../components/TheCalender/Calendar';
import TheEentry from '../../components/TheMain/ThEentry';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    overflow: 'auto',
    maxHeight: 500,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 500,
    overflow: "scroll",
    margin: '0 0.25rem',
  },
  table: {
    width: '100%',
    minWidth: 650,
  },
  container: {
    padding: theme.spacing(2)
  },
}));


export default function Dashboard(props) {
  const classes = useStyles();
  let [checkedUser, setCheckedUser] = useState(0);
  let [checkedCat, setCheckedCat] = useState(0);
  let [timestamp, setTimestamp] = useState(0);
  let [entries, setEntries] = useState([]);

  const { user } = props;

  useEffect(() => {
    axios.get('/api/entries', {
      params: {
        timestamp: timestamp,
        categoryId: checkedCat,
        userId: checkedUser,
      }
    })
      .then(function (response) {
        setEntries(response.data);
      })
      .catch(function (error) {
        console.info(error);
      })
      .then(function () {
        // always executed
      });
  }, [checkedUser, checkedCat, timestamp])

  const onSelectDate = (e) => {
    try {
      setTimestamp((new Date(e)).getTime());
    } catch (err) {
      setTimestamp(0);
    }
  }

  return (
    <DashboardContainer user={user}>
      <Container maxWidth="xl" className={classes.container}>
        <div className="my-2"/>
        <Grid container spacing={0}>
          <Grid xs={12} md={5} lg={6} xl={6}>
            <Paper className={classes.paper}>
              <TheUsers setCheckedUser={setCheckedUser}/>
            </Paper>
          </Grid>
          <Grid xs={6} md={4} lg={3} xl={3}>
            <Paper className={classes.paper}>
              <TheCategories setCheckedCat={setCheckedCat}/>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3} lg={3} xl={3}>
            <Calendar className="calendarContainer jalaali" onSelect={onSelectDate}/>
          </Grid>
        </Grid>
        <div className="my-2"/>
        <Grid container spacing={0}>
          <Grid xs={12}>
            <Paper className={classes.paper}>
              <TheEentry entries={entries} checkedCat={checkedCat} checkedUser={checkedUser}/>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardContainer>
  )
}






