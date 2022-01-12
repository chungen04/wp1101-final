import * as React from 'react';
import {useRef} from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Input, Button} from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check"

export default function ExamForm({ updateFile, file }) {

  const problemRef = useRef()
  const answerRef = useRef()

  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
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
        <label htmlFor="import-button-problem">
          <Input
              style={{display: "none"}}
              id="import-button-problem"
              inputProps={{
                accept:
                  ".pdf",
              }}
              ref={problemRef}
              type="file"
              onChange = {()=>{
                updateFile({"problemPDF":  problemRef.current.children[0].files[0]})
              }}
            />
            <Button color="primary" variant="contained" component="span"> Upload Problem </Button>
          </label>
          {
            file.problemPDF === "" ?
            <></> :
            <CheckIcon color="primary"/> 
          }
          <Typography >
            Import pdf* (Question, PDF only)            
          </Typography>
        </Grid>
        <Grid item xs={12} sm = {12}>
          <label htmlFor="import-button-answer">
            <Input
                style={{display: "none"}}
                id="import-button-answer"
                inputProps={{
                  accept:
                    ".pdf",
                }}
                ref={answerRef}
                type="file"
                onChange = {()=>{
                  updateFile({"answerPDF":  answerRef.current.children[0].files[0]})
                }}
            />
            <Button color="secondary" variant="contained" component="span" > Upload Answer </Button>
          </label>
          {
            file.answerPDF === "" ?
            <></> :
            <CheckIcon color="secondary"/> 
          }
          <Typography >
            Import pdf (Answer, Optional, PDF only)
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}