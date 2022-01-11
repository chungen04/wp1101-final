import * as React from 'react';
import {useState, useEffect} from 'react'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { InputLabel, NativeSelect, Checkbox} from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import { EXAMS_QUERY } from '../graphql'; 

const types = ["", "Midterm", "Final", "Quiz"];

export default function ExamForm({ updateExam, exam, addCourse, addExam, setAddExam, showAlert, course }) {
  console.log(course.id)
  const {data, loading, subscribeToMore} = useQuery(EXAMS_QUERY, {
    variables: {courseID: course.id}
  });
  const [examData, setExamData] = useState([])
  
  useEffect(() => {
    if(!data)return 
    console.log(data)
    setExamData([{examName: "", examTime: ""}, ...data.examsForContribute])
  }, [data])

  const handleCheckbox = () => {
    setAddExam(!addExam)
  }

  const updateExamBind = async(value) => {
    const [examName, examTime] = value.split(" - ")
    let id = ""
    await Promise.all(
      examData.map((oneData) => {
        if (oneData.examName === examName && oneData.examTime === examTime){
          id = oneData.id
        }
      })
    )
    updateExam({id, examName, examTime})
  }

  return (
    <React.Fragment>
      {
        addCourse ? 
        <>
          <Typography variant="h5" gutterBottom>
            Submission Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm = {6}>
              <TextField
                required
                id="name"
                name="examName"
                value={exam.examName}
                label="Exam Name(Midterm/Final/Quiz/...)"
                onChange = {(e)=>updateExam({"examName": e.target.value})}
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
              />
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
        </> :
        addExam ? 
        <>
          <Grid container>
            <Grid item xs={12} sm={9}>
              <Typography variant="h5" gutterBottom>
                Submission Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Checkbox checked={addExam} onChange={handleCheckbox} />
              <Typography variant="h7" gutterBottom>
                Add new exam
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm = {6}>
              <TextField
                required
                id="name"
                name="examName"
                value={exam.examName}
                label="Exam Name(Midterm/Final/Quiz/...)"
                onChange = {(e)=>updateExam({"examName": e.target.value})}
                fullWidth
                autoComplete="shipping address-level2"
                variant="standard"
              />
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
        </> :
        loading ? <></> :         
        <>
          <Grid container>
            <Grid item xs={12} sm={9}>
              <Typography variant="h5" gutterBottom>
                Submission Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Checkbox checked={addExam} onChange={handleCheckbox} />
              <Typography variant="h7" gutterBottom>
                Add new course
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm = {6}>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Exam Name(Midterm/Final/Quiz/...) - Exam Time
              </InputLabel>
              <NativeSelect
                defaultValue={exam.examName + " - " + exam.examTime}
                value={exam.examName + " - " + exam.examTime}
                onChange={(e)=>updateExamBind(e.target.value)}
                fullWidth
              >
                {examData.map((oneData) => (
                    <option value={oneData.examName + " - " + oneData.examTime}>
                    {oneData.examName + " - " + oneData.examTime}
                    </option>
                ))}
              </NativeSelect>
            </Grid>
          </Grid>
        </>
      }
      
    </React.Fragment>
  );
}