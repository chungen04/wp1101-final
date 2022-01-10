import * as React from 'react';
import {Grid, Typography, TextField }from '@mui/material';
import { InputLabel, NativeSelect} from "@material-ui/core";

const Semester = ["Fall", "Spring", "Summer"];
const Property = ["Required", "Elective", "Liberal"];

export default function CourseForm({ updateCourse, course }) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Submission Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange = {(e)=>updateCourse({"year": e.target.value})}
            value={course.year}
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
            Semester
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            onChange={(e)=>updateCourse({"semester": e.target.value})}
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
            id="courseDept"
            value={course.department}
            onChange = {(e)=>updateCourse({"department": e.target.value})}
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
            value={course.courseName}
            onChange = {(e)=>updateCourse({"courseName": e.target.value})}
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
            value={course.instructors}
            onChange={(e)=>updateCourse({"instructors": e.target.value})}
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
            onChange={(e)=>updateCourse({"type": e.target.value})}
            fullWidth
          >
            {Property.map((option) => (
                <option value={option}>
                {option}
                </option>
            ))}
          </NativeSelect>
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}