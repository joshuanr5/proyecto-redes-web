import React, { useState } from 'react';
import _ from 'lodash';
import {
  Divider,
  Paper,
  Grid,
  Typography,
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
  Button,
  Avatar,
  makeStyles
} from '@material-ui/core';
import API from '../../libs/api';
import { logout } from '../../libs/auth';

const useStyles = makeStyles({
  container: {
    padding: '40px 200px',
    height: '100%'
  },
  bigLabel: {
    fontWeight: 700,
    color: '#47525e',
    textAlign: 'center',
    margin: 'auto 0'
  },
  labelContainer: {
    display: 'flex'
  },
  avatar: {
    width: 60,
    height: 60,
    fontSize: '25px'
  },
  avatarContainer: {
    display: 'flex',
    position: 'absolute',
    right: '60px',
    top: '50px',
    cursor: 'pointer'
  },
  list: {
    backgroundColor: '#ffdfd4',
    borderRadius: '20px',
    padding: '20px',
    listStyle: 'none'
  }
});

function Test({ history }) {
  const classes = useStyles();
  const [age, setage] = useState('');
  const [gender, setgender] = useState('');
  const [jobs, setjobs] = useState('');
  const [housing, sethousing] = useState('');
  const [account, setaccount] = useState('');
  const [credit, setcredit] = useState('');
  const [fees, setfees] = useState('');
  const [purpose, setpurpose] = useState('');
  const [errors, seterrors] = useState([]);

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const setState = {
    setage,
    setgender,
    setjobs,
    sethousing,
    setaccount,
    setcredit,
    setfees,
    setpurpose
  };

  const handleChange = (type, ev) => {
    // setstate({ [type]: ev.target.value });
    // setgender(ev.target.value);
    // console.log(type, ev.target.value);

    setState[`set${type}`](ev.target.value);
  };

  const handleClick = async type => {
    if (type === 'send') {
      const data = {
        Age: parseInt(age, 10),
        Sexo: gender,
        Trabajo: parseInt(jobs, 10),
        Alojamiento: housing,
        CuentaDeAhorros: account,
        MontoDeCredito: parseInt(credit, 10),
        Duracion: parseInt(fees, 10),
        Proposito: purpose
      };
      console.log(data);
      const errorsTemp = [];
      _.forEach(data, (dt, idx) => {
        if (dt === '' || _.isNaN(dt)) {
          console.log(dt, idx);
          errorsTemp.push(`"${idx}" es requerido`);
        }
      });

      console.log(errorsTemp);

      if (!_.isEmpty(errorsTemp)) {
        seterrors(errorsTemp);
      } else {
        try {
          console.log(data);

          const {
            data: { result }
          } = await API.predict(data);
          console.log('result ->', result);
          history.push(`/result?type=${result}`);
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      _.forEach(setState, setSingleState => setSingleState(''));
    }
  };

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <Paper className={classes.container}>
      <div className={classes.avatarContainer} onClick={handleLogout}>
        <Avatar className={classes.avatar}>JN</Avatar>
      </div>
      <form>
        <Grid container>
          <Grid container justify="center">
            <Grid item xs="auto">
              <Typography
                variant="h3"
                gutterBottom
                style={{ marginBottom: '40px' }}
                className={classes.bigLabel}
              >
                Simulador de Riesgo Crediticio
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Ingreso de datos
              </Typography>
            </Grid>
            <Divider
              component="hr"
              style={{ width: '100%', marginBottom: '40px' }}
            />
            <Grid container style={{ paddingLeft: '40px' }}>
              {_.isEmpty(errors) ? null : (
                <Grid item container justify="center">
                  <ul className={classes.list}>
                    {_.map(errors, (e, idx) => {
                      console.log(e, idx);
                      return (
                        <li style={{ color: 'red' }} key={idx}>
                          {e}
                        </li>
                      );
                    })}
                  </ul>
                </Grid>
              )}
              <Grid container justify="space-between">
                <Grid item xs={4} className={classes.labelContainer}>
                  <Typography variant="h5" className={classes.bigLabel}>
                    Edad
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Grid item xs={8}>
                    <TextField
                      id="age"
                      label="Escriba su edad"
                      placeholder="Ej: 24"
                      value={age}
                      onChange={handleChange.bind(this, 'age')}
                      type="number"
                      className={classes.textField}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item xs={4} className={classes.labelContainer}>
                  <Typography variant="h5" className={classes.bigLabel}>
                    Sexo
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <FormControl
                    component="fieldset"
                    margin="dense"
                    required
                    // className={classes.formControl}
                  >
                    <RadioGroup
                      aria-label="Gender"
                      name="gender"
                      value={gender}
                      onChange={handleChange.bind(this, 'gender')}
                      row
                    >
                      <FormControlLabel
                        value="F"
                        control={<Radio />}
                        label="Femenino"
                      />
                      <FormControlLabel
                        value="M"
                        control={<Radio />}
                        label="Masculino"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item xs={4} className={classes.labelContainer}>
                  <Typography variant="h5" className={classes.bigLabel}>
                    Trabajos
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Grid item xs={8}>
                    <TextField
                      id="age"
                      label="Escriba la cantidad de trabajos"
                      placeholder="Ej: 2"
                      value={jobs}
                      onChange={handleChange.bind(this, 'jobs')}
                      type="number"
                      className={classes.textField}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item xs={4} className={classes.labelContainer}>
                  <Typography variant="h5" className={classes.bigLabel}>
                    Tipo de alojamiento
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <FormControl
                    component="fieldset"
                    margin="dense"
                    // className={classes.formControl}
                  >
                    <RadioGroup
                      aria-label="Housing"
                      name="housing"
                      value={housing}
                      onChange={handleChange.bind(this, 'housing')}
                      row
                    >
                      <FormControlLabel
                        value="prop"
                        control={<Radio />}
                        label="Propio"
                      />
                      <FormControlLabel
                        value="rentado"
                        control={<Radio />}
                        label="Rentado"
                      />
                      <FormControlLabel
                        value="gratis"
                        control={<Radio />}
                        label="Gratis"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item xs={4} className={classes.labelContainer}>
                  <Typography variant="h5" className={classes.bigLabel}>
                    Cuenta de ahorro
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Grid item xs={8}>
                    <FormControl
                      margin="dense"
                      variant="outlined"
                      required
                      fullWidth
                    >
                      <InputLabel ref={inputLabel} htmlFor="account">
                        Selecciona la cuenta de ahorros
                      </InputLabel>
                      <Select
                        value={account}
                        onChange={handleChange.bind(this, 'account')}
                        input={
                          <OutlinedInput
                            labelWidth={labelWidth}
                            name="account"
                            id="account"
                          />
                        }
                      >
                        <MenuItem value={'na'}>NA</MenuItem>
                        <MenuItem value={'poco'}>Poco</MenuItem>
                        <MenuItem value={'moderado'}>Moderado</MenuItem>
                        <MenuItem value={'casi rico'}>Casi rico</MenuItem>
                        <MenuItem value={'rico'}>Rico</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item xs={4} className={classes.labelContainer}>
                  <Typography variant="h5" className={classes.bigLabel}>
                    Monto de credito
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Grid item xs={8}>
                    <TextField
                      id="credit"
                      label="Escriba el monto"
                      placeholder="Ej: 15 000"
                      value={credit}
                      onChange={handleChange.bind(this, 'credit')}
                      type="number"
                      className={classes.textField}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item xs={4} className={classes.labelContainer}>
                  <Typography variant="h5" className={classes.bigLabel}>
                    Plazo en cuotas
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Grid item xs={8}>
                    <TextField
                      id="fees"
                      label="Escriba las cuotas"
                      placeholder="Ej: 12"
                      value={fees}
                      onChange={handleChange.bind(this, 'fees')}
                      type="number"
                      className={classes.textField}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item xs={4} className={classes.labelContainer}>
                  <Typography variant="h5" className={classes.bigLabel}>
                    Proposito
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Grid item xs={8}>
                    <FormControl margin="dense" variant="outlined" fullWidth>
                      <InputLabel ref={inputLabel} htmlFor="purpose">
                        Selecciona el proposito del credito
                      </InputLabel>
                      <Select
                        value={purpose}
                        onChange={handleChange.bind(this, 'purpose')}
                        input={
                          <OutlinedInput
                            labelWidth={labelWidth}
                            name="purpose"
                            id="purpose"
                          />
                        }
                      >
                        <MenuItem value={'carro'}>Carro</MenuItem>
                        <MenuItem value={'inmoviliario/equipo'}>
                          Inmoviliario/Equipo
                        </MenuItem>
                        <MenuItem value={'radio/TV'}>Radio/TV</MenuItem>
                        <MenuItem value={'usos domesticos'}>
                          Usos domesticos
                        </MenuItem>
                        <MenuItem value={'refacciones'}>Refacciones</MenuItem>
                        <MenuItem value={'educacion'}>Educación</MenuItem>
                        <MenuItem value={'negocios'}>Neogocios</MenuItem>
                        <MenuItem value={'vacaciones/otros'}>
                          Vacaciones/Otros
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                justify="space-between"
                style={{ marginTop: '40px' }}
              >
                <Grid container item xs={9} justify="space-between">
                  <Grid item xs={4}>
                    <Button
                      onClick={handleClick.bind(this, 'clear')}
                      variant="outlined"
                      className={classes.button}
                      fullWidth
                    >
                      Borrar
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      onClick={handleClick.bind(this, 'send')}
                      variant="outlined"
                      className={classes.button}
                      fullWidth
                    >
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={6} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default Test;
