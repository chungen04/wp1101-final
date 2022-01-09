import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Input, InputLabel, Button, Container } from "@material-ui/core";
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "5%",
    height:"60vh"
    //opacity: "0.7"
  },
  form: {
    width: "90%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    height:"50vh",
    display: "flex",
    alignItems: "center",
  },
}))

const types = [
  {
    key: 'midterm',
    value: 'midterm',
  },
  {
    key: 'final',
    value: 'final',
  },
  {
    key: 'quiz',
    value: 'quiz',
  }
];

const Form = () => {
  const [type, setType] = React.useState('');
  const classes = useStyles();
  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <Container component="main" maxWidth="md">
    <div className={classes.paper}>
    <form className={classes.form} noValidate autoComplete="off">
      <div>
        <TextField 
          id="outlined-select-type"
          select
          label="Select Midterm/Final/Quiz"
          value={type}
          onChange={handleChange}
          helperText="Please select your type"
        >
          {types.map((option) => (
            <MenuItem key = {option.key} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField> 
        <TextField
          id="standard-number"
          label="Year of the exam"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          defaultValue = "110"
        /> 
        <TextField 
          required 
          id="standard-required"
          label="Dept. of the course" 
          defaultValue="" 
        /> 
        <TextField 
          required 
          id="standard-required"
          label="Course Name" 
          defaultValue="" 
        />
        <TextField 
          required 
          id="standard-required"
          label="Instructor" 
          defaultValue="" 
        />
        <TextField 
          id="standard"
          label="Remarks (optional)" 
          defaultValue="" 
        />
        <InputLabel htmlFor="import-button">
          <Input
              id="import-button"
              inputProps={{
                accept:
                  ".pdf",
              }}
              type="file"
          />
          Import pdf (Question, pdf Only)
        </InputLabel>
        <InputLabel htmlFor="import-button">
          <Input
              id="import-button"
              inputProps={{
                accept:
                  ".pdf",
              }}
              type="file"
          />
          Import pdf (Answer, Optional, pdf only)
        </InputLabel>
      </div>
    </form>
  </div>
  </Container>
  );
}

export default Form