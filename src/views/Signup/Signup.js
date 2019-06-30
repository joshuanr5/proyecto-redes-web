import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  TextField,
  Grid,
  Paper,
  Typography,
  Button
} from '@material-ui/core';
import API from '../../libs/api';
import { setToken, loggedIn } from '../../libs/auth';

const useStyles = makeStyles({
  container: {
    height: '100%'
  },
  label: {
    fontWeight: 700,
    color: '#47525e'
  },
  field: {
    marginTop: '10px'
  }
});

const Signup = ({ history }) => {
  const classes = useStyles();
  const [firstname, setfirstname] = useState('');
  const [lastname, setlastname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [password2, setpassword2] = useState('');

  const setState = {
    setfirstname,
    setlastname,
    setemail,
    setpassword,
    setpassword2
  };

  const handleChange = (type, ev) => {
    setState[`set${type}`](ev.target.value);
  };

  const handleClick = async ev => {
    // validar password

    const userData = {
      firstname,
      lastname,
      email,
      password,
      password2
    };

    try {
      const { data } = await API.signup(userData);
      const { token } = data;
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
    <Grid
      className={classes.container}
      container
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={7} md={6} lg={5}>
        <Paper style={{ padding: '40px 0px' }}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={11} sm={10} md={7}>
              <Typography
                align="center"
                variant="h4"
                gutterBottom
                className={classes.label}
              >
                Registro
              </Typography>
            </Grid>
            <Grid item xs={11} sm={10} md={7}>
              <TextField
                id="firstname"
                label="Nombres"
                placeholder="Ej: Jose"
                value={firstname}
                onChange={handleChange.bind(this, 'firstname')}
                margin="dense"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={11} sm={10} md={7}>
              <TextField
                id="lastname"
                label="Apellidos"
                placeholder="Ej: Ramirez"
                value={lastname}
                onChange={handleChange.bind(this, 'lastname')}
                margin="dense"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={11} sm={10} md={7}>
              <TextField
                id="email"
                label="Correo electrónico"
                placeholder="Ej: micorreo@mail.com"
                value={email}
                onChange={handleChange.bind(this, 'email')}
                margin="dense"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={11} sm={10} md={7}>
              <TextField
                id="password"
                label="Contraseña"
                value={password}
                type="password"
                onChange={handleChange.bind(this, 'password')}
                margin="dense"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={11} sm={10} md={7}>
              <TextField
                id="password2"
                label="Repita contraseña"
                value={password2}
                type="password"
                onChange={handleChange.bind(this, 'password2')}
                margin="dense"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={11} sm={10} md={7} style={{ marginTop: '20px' }}>
              <Button
                onClick={handleClick}
                variant="contained"
                color="primary"
                className={classes.button}
                fullWidth
              >
                Registrarse
              </Button>
            </Grid>
            <Grid
              container
              justify="center"
              item
              xs={12}
              className={classes.field}
            >
              <Link
                to="/login"
                style={{ color: '#3f51b5', fontSize: '0.875rem' }}
              >
                Iniciar sesión
              </Link>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Signup;
