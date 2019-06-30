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
import API from '../../libs/api';
import { setToken, loggedIn } from '../../libs/auth';

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
  link: { color: '#3f51b5', fontSize: '0.875rem' }
});

const Login = ({ history }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = async () => {
    console.log(email, password);

    try {
      const {
        data: { token }
      } = await API.login({ email, password });

      console.log(token);

      setToken(token);
      history.push('/test');
    } catch (error) {
      console.error(error.response.data);
    }
  };

  if (loggedIn()) {
    history.push('/test');
    return null;
  }

  return (
    <Paper className={classes.form}>
      <Grid
        className={classes.container}
        container
        // direction="column"
        // alignItems="center"
      >
        <Grid item xs={12}>
          <Typography align="center" variant="h4" component="h2" gutterBottom>
            Simulador de riesgo crediticio
          </Typography>
        </Grid>
        <Grid item xs={12} style={{ color: '#a8b2c1' }}>
          <Typography
            align="center"
            variant="subtitle1"
            component="h2"
            gutterBottom
          >
            Análisis mediante la clasificación del riesgo crediticio
          </Typography>
        </Grid>
        <Grid container justify="center">
          <Grid xs={12} sm={10} md={8} lg={6} item>
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
          <Grid item xs={12} sm={10} md={8} lg={6}>
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
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Button
              onClick={handleClick}
              variant="contained"
              color="primary"
              className={classes.button}
              fullWidth
            >
              Iniciar Sesión
            </Button>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid
            container
            justify="space-between"
            item
            xs={12}
            sm={10}
            md={8}
            lg={6}
          >
            <Link to="/recovery" className={classes.link}>
              Olvidó su clave?
            </Link>
            <Link to="/signup" className={classes.link}>
              No tiene cuenta? Registrese
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
