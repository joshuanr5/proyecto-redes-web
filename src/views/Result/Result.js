import React from 'react';
import queryString from 'query-string';
import {
  makeStyles,
  Card,
  CardContent,
  Paper,
  Typography,
  Grid
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    height: '100%'
  },
  bigLabel: {
    fontWeight: 700,
    color: '#47525e'
  },
  card: {
    marginTop: '40px',
    minWidth: 275
  },
  cardContent: {
    padding: '16px !important'
  },
  title: {
    fontSize: 14
  },
  field: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  }
});

const Result = ({ location }) => {
  const classes = useStyles();
  const { type } = queryString.parse(location.search);
  return (
    <Paper className={classes.container}>
      <Grid
        className={classes.container}
        container
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs="auto">
          <Typography variant="h3" className={classes.bigLabel}>
            Simulador de Riesgo Crediticio
          </Typography>
        </Grid>
        <Grid container direction="column" alignContent="center">
          <Grid item xs="auto">
            <Typography
              variant="h5"
              align="center"
              className={classes.bigLabel}
            >
              Resultado
            </Typography>
          </Grid>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography className={classes.bigLabel} align="center">
                {type === 'good' ? 'BUENO' : 'MALO'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item className={classes.field}>
          <Link to="/test" style={{ color: '#a8b2c1' }}>
            Empezar de nuevo
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Result;
