import React, { useState } from 'react';
import {
  TextField,
  Paper,
  Grid,
  Button,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  form: {
    width: '50%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px'
  },
  container: {
    height: '100%'
  },
  field: {
    // width: '100%'
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
    // alignItems: 'center'
  }
});

const Login = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    console.log(email, password);

    history.push('/test');
  };

  return (
    <Paper className={classes.form}>
      <Grid
        className={classes.container}
        container
        // direction="column"
        // alignItems="center"
      >
        <Grid item xs={12} className={classes.field}>
          <Typography variant="h4" component="h2" gutterBottom>
            Simulador de riesgo crediticio
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          className={classes.field}
          style={{ color: '#a8b2c1' }}
        >
          <Typography variant="subtitle1" component="h2" gutterBottom>
            Análisis mediante la clasificación del riesgo crediticio
          </Typography>
        </Grid>
        <Grid container justify="center">
          <Grid xs={6} item>
            <TextField
              id="outlined-email-input"
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="dense"
              variant="outlined"
              value={email}
              onChange={ev => setEmail(ev.target.value)}
              autoFocus
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={6}>
            <TextField
              id="outlined-password-input"
              label="Password"
              className={classes.textField}
              type="password"
              autoComplete="current-password"
              margin="dense"
              variant="outlined"
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          justify="center"
          style={{ margin: '20px 0px 20px 0px' }}
        >
          <Grid item xs={6}>
            <Button
              onClick={handleClick}
              variant="contained"
              className={classes.button}
              fullWidth
            >
              Iniciar Sesión
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.field}>
          <Link to="/recovery" style={{ color: '#a8b2c1' }}>
            Recuperar contraseña
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
