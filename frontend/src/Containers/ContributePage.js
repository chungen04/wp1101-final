import * as React from 'react';
import {useState} from "react"
import {Navigate} from "react-router-dom"
import {
  CssBaseline, 
  AppBar, 
  Box, 
  Container, 
  Toolbar, 
  Paper, 
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Modal
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CourseForm from '../Components/CourseForm';
import ExamForm from '../Components/ExamForm';
import FileForm from '../Components/FileForm';
import Review from '../Components/Review';
import useContribute from "../Hooks/useContribute"

const steps = ['Course Details', 'Exam Details', 'File Details', 'Check Submission'];

const theme = createTheme();
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function ContributePage() {
  const {
    updateCourse,
    updateExam,
    updateFile,
    course,
    exam,
    file
  } = useContribute()

  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [leave, setLeave] = useState(false);

  const handleNext = () => {
    if(activeStep === 0){
      if (
        course.year === "" || 
        course.department === "" || 
        course.instructors === "" || 
        course.name === "" ||
        course.type === "" ||
        course.semester === ""
      ){
        alert("Filled the required fields!")
        return
      }
    }
    if(activeStep === 1){
      if (
        exam.examTime === ""){
          alert("Filled the required field!")
          return
      }
    }
    if(activeStep === 2){
      if (
        file.problemPDF === ""){
          alert("Upload the question file!")
          return
      }
    }
    setActiveStep(activeStep + 1);
    if(activeStep === steps.length-1){
      console.log({
        course, exam, file
      })
      setOpen(true)
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    leave? (<Navigate to = "/"></Navigate>): (
    <ThemeProvider theme={theme}>
      <Modal
        open={open}
        onClose = {() => {
          setOpen(false)
          setLeave(true)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2}}>
          Submission Succeess! Thank you so much for your contribution.
          Your submission will be sent to the admin.
          </Typography>
        </Box>
      </Modal>

      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      <Toolbar></Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Typography variant="h6" color="inherit" noWrap align = "center">
            <br></br>Please fill in the information of your contribution. Thanks a lot!!
        </Typography>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Submission
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {
              (()=>{
                switch(activeStep){
                  case 0:
                    return <CourseForm 
                        updateCourse={updateCourse}
                        course={course}
                      />
                  case 1:
                    return <ExamForm 
                        updateExam={updateExam}
                        exam={exam}
                      />
                  case 2:
                    return <FileForm 
                        updateFile={updateFile}
                        file={file}
                      />
                  case 3:
                    return <Review 
                        course={course}
                        exam={exam}
                        file={file}
                      />
                  default:
                    break
                }
              })()
            }
            <Box sx={{ display: 'flex',justifyContent: 'flex-end' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
    ));
}