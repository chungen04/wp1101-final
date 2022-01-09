import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../Components/SubmissionForm';
import Review from '../Components/Review';
import Modal from "@mui/material/Modal"
import {useState} from "react"
import {Navigate} from "react-router-dom"

const steps = ['Submission Details', 'Check Submission'];

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
  const [type, setType] = useState('Required');
  const [property, setProperty] = useState('Midterm');
  const [semester, setSemester] = useState('Fall');
  const [year, setYear] = useState(0);
  const [examTime, setExamTime] = useState(0);
  const [courseDept, setCourseDept] = useState("");
  const [courseName, setCourseName] = useState("");
  const [instructor, setInstructor] = useState("");
  const [remarks, setRemarks] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [problemPdf, setProblemPdf] = useState();
  const [answerPdf, setAnswerPdf] = useState();
  const [open, setOpen] = useState(false);
  const [leave, setLeave] = useState(false);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    if(activeStep === steps.length-1){
      console.log({
        type: type,
        property: property,
        semester: semester,
        year: year,
        examTime: examTime,
        courseDept: courseDept,
        courseName: courseName,
        instructor: instructor,
        remarks: remarks,
        problemPdf: problemPdf,
        answerPdf: answerPdf
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
            {activeStep === 0 ?( 
              <AddressForm 
                  setType = {setType}
                  setProperty = {setProperty}
                  setSemester = {setSemester}
                  setYear = {setYear}
                  setExamTime = {setExamTime}
                  setCourseDept = {setCourseDept}
                  setCourseName = {setCourseName}
                  setInstructor = {setInstructor}
                  setRemarks = {setRemarks}
                  setProblemPdf = {setProblemPdf}
                  setAnswerPdf = {setAnswerPdf}
              />):(
                activeStep === 1 ? (
                <Review 
                  type = {type}
                  property = {property}
                  semester = {semester}
                  year = {year}
                  examTime = {examTime}
                  courseDept = {courseDept}
                  courseName = {courseName}
                  instructor = {instructor}
                  remarks = {remarks}
                />):(<></>)
              )
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