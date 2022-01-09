import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useState} from "react";
import { Input, InputLabel, NativeSelect} from "@material-ui/core";

const types = ["Midterm", "Final", "Quiz"];
const Semester = ["Fall", "Spring", "Summer"];
const Property = ["Required", "Elective", "Liberal"];

export default function AddressForm() {
  const [type, setType] = useState('');
  const [property, setProperty] = useState('');
  const [semester, setSemester] = useState('');
  const [year, setYear] = useState(0);
  const [examTime, setExamTime] = useState("");
  const [courseDept, setCourseDept] = useState("");
  const [courseName, setCourseName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleChangeType = (event) => {
      setType(event.target.value);
  };
  const handleChangeProperty = (event) => {
      setProperty(event.target.value);
  };
  const handleChangeSemester = (event) => {
      setSemester(event.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Submission Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="year"
            type = "number"
            name="year"
            label="Year"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm = {6}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Midterm/Final/Quiz
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            onChange={handleChangeType}
            value={type}
            fullWidth
          >
            {types.map((option) => (
                <option value={option}>
                {option}
                </option>
            ))}
          </NativeSelect>
        </Grid>
        <Grid item xs={12} sm = {6}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Semester
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            onChange={handleChangeSemester}
            value={semester}
            fullWidth
          >
            {Semester.map((option) => (
                <option value={option}>
                {option}
                </option>
            ))}
          </NativeSelect>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="time"
            name="time"
            label="Exam time"
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="courseDept"
            name="courseDept"
            label="Course Department"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="course"
            name="course"
            label="Course Name"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Instructor"
            name="Instructor"
            label="Instructor"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Course Type (Required/Elective/Liberal)
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            onChange={handleChangeProperty}
            value={property}
            fullWidth
          >
            {Property.map((option) => (
                <option value={option}>
                {option}
                </option>
            ))}
          </NativeSelect>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Remarks"
            name="Remarks"
            label="Remarks (Optional)"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="send a copy to me"
          />
        </Grid>
      </Grid>
      <Grid container spacing = {3}>
      <Grid item xs={12} sm = {12}>
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
        </Grid>
        <Grid item xs={12} sm = {12}>
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
        </Grid>
      </Grid>
    </React.Fragment>

  );
}