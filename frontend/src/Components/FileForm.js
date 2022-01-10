import * as React from 'react';
import {useRef} from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Input, InputLabel} from "@material-ui/core";

export default function ExamForm({ updateFile, file }) {

  const problemRef = useRef()
  const answerRef = useRef()

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Submission Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="Remarks"
            name="Remarks"
            value={file.remarks}
            onChange={(e)=>updateFile({"remarks": e.target.value})}
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
              ref={problemRef}
              type="file"
              onChange = {()=>{
                updateFile({"problemPDF": problemRef.current.children[0].files[0]})
              }}
          />
          Import pdf* (Question, pdf Only)
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
              ref={answerRef}
              type="file"
              onChange = {()=>{console.log(answerRef)
                updateFile({"answerPDF": answerRef.current.children[0].files[0]})}}
          />
          Import pdf (Answer, Optional, pdf only)
        </InputLabel>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}