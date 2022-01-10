import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { InputLabel, NativeSelect} from "@material-ui/core";

const types = ["Midterm", "Final", "Quiz"];

export default function ExamForm({ updateExam, exam }) {

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Submission Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm = {6}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Midterm/Final/Quiz
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            onChange={(e)=>updateExam({"examName": e.target.value})}
            fullWidth
          >
            {types.map((option) => (
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
            value={exam.examTime}
            type = "number"
            label="Exam time (in minutes)"
            onChange = {(e)=>updateExam({"examTime": e.target.value})}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}