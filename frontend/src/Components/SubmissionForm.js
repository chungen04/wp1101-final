import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Input, InputLabel, NativeSelect} from "@material-ui/core";
import { set } from 'express/lib/application';

const types = ["Midterm", "Final", "Quiz"];
const Semester = ["Fall", "Spring", "Summer"];
const Property = ["Required", "Elective", "Liberal"];

export default function AddressForm({
    setType,
    setProperty,
    setSemester,
    setYear,
    setExamTime,
    setCourseDept,
    setCourseName,
    setInstructor,
    setRemarks,
    setProblemPdf,
    setAnswerPdf
  }) {
  
  const inputProblemPdf = document.getElementById("import-button-problem");
  const inputAnswerPdf = document.getElementById("import-button-answer");
  
  const handleChangeType = (event) => {
      setType(event.target.value);
  };
  const handleChangeProperty = (event) => {
      setProperty(event.target.value);
  };
  const handleChangeSemester = (event) => {
      setSemester(event.target.value);
  };
  const handleChangeYear = (event) => {
      setYear(event.target.value);
  };
  const handleChangeExamTime = (event) => {
    setExamTime(event.target.value);
  };
  const handleChangeCourseDept = (event) => {
    setCourseDept(event.target.value);
  };
  const handleChangeCourseName = (event) => {
    setCourseName(event.target.value);
  };
  const handleChangeInstructor = (event) => {
    setInstructor(event.target.value);
  };
  const handleChangeRemarks = (event) => {
    setRemarks(event.target.value);
  };
  const handleChangeProblemPdf = () => {
    setProblemPdf(inputProblemPdf.files[0])
  };
  const handleChangeAnswerPdf = () => {
    setAnswerPdf(inputAnswerPdf.files[0])
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
            onChange = {handleChangeYear}
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
            type = "number"
            label="Exam time (in minutes)"
            onChange = {handleChangeExamTime}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="courseDept"
            onChange = {handleChangeCourseDept}
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
            onChange = {handleChangeCourseName}
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
            onChange={handleChangeInstructor}
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
            onChange={handleChangeRemarks}
            label="Remarks (Optional)"
            fullWidth
            autoComplete="shipping country"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
      <Grid container spacing = {3}>
      <Grid item xs={12} sm = {12}>
        <InputLabel htmlFor="import-button">
          <Input
              id="import-button-problem"
              inputProps={{
                accept:
                  ".pdf",
              }}
              type="file"
              onChange = {handleChangeProblemPdf}
          />
          Import pdf (Question, pdf Only)
        </InputLabel>
        </Grid>
        <Grid item xs={12} sm = {12}>
        <InputLabel htmlFor="import-button">
          <Input
              id="import-button-answer"
              inputProps={{
                accept:
                  ".pdf",
              }}
              type="file"
              onChange = {handleChangeAnswerPdf}
          />
          Import pdf (Answer, Optional, pdf only)
        </InputLabel>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}