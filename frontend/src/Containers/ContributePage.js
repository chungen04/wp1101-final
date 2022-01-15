import * as React from 'react';
import {useState} from "react"
import {Navigate} from "react-router-dom"
import {useMutation} from "@apollo/react-hooks";
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
  Modal,
  Snackbar, 
  Alert 
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import CourseForm from '../Components/CourseForm';
import ExamForm from '../Components/ExamForm';
import FileForm from '../Components/FileForm';
import Review from '../Components/Review';
import useContribute from "../Hooks/useContribute"
import axios from "../api";
import { CREATE_COURSE_MUTATION, CREATE_EXAM_MUTATION, CREATE_FILE_MUTATION } from '../graphql';

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

  const [createCourse] = useMutation(CREATE_COURSE_MUTATION)
  const [createExam] = useMutation(CREATE_EXAM_MUTATION)
  const [createFile] = useMutation(CREATE_FILE_MUTATION)

  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [leave, setLeave] = useState(false);
  const [addCourse, setAddCourse] = useState(false)
  const [addExam, setAddExam] = useState(false)
  const [alert, setAlert] = useState({});

  const showAlert = (severity, msg) => {
    setAlert({ open: true, severity, msg });
  };

  const sendFile = async(pdf) => {
    const formData = new FormData();
    formData.append("file", pdf, pdf.name);
    const response = await axios.post('/api/fileupload', formData);
    return response.data
  }

  const createGraphqlFile = async(examID) => {
    let {id, webContentLink, webViewLink} = await sendFile(file.problemPDF)
    const problemID = id;
    const problemDownloadLink = webContentLink;
    const problemViewLink= webViewLink;
    if(file.answerPDF !== ""){
      const answerFile = await sendFile(file.answerPDF)
      let {id, webContentLink, webViewLink} = answerFile
      const answerID = id;
      const answerDownloadLink = webContentLink;
      const answerViewLink= webViewLink;
      await createFile({variables: {
        examID,
        remarks: file.remarks,
        problemID, problemViewLink, problemDownloadLink,
        answerID, answerViewLink, answerDownloadLink,
      }})
    } else{
      await createFile({variables: {
        examID,
        remarks: file.remarks,
        problemID, problemViewLink, problemDownloadLink,
      }})
    }
  }

  const handleUpload = async() => {    
    if(addCourse){
      let courseInput = course
      courseInput.courseType = course.type
      courseInput.year = courseInput.year*1
      const courseData = await createCourse({variables: courseInput})
      const courseID = courseData.data.createCourse.id
      const examData = await createExam({variables: {...exam, courseID, examTime: exam.examTime*1}})
      const examID = examData.data.createExam.id
      await createGraphqlFile(examID)
    }else if(addExam){
      const examData = await createExam({variables: {...exam, courseID: course.id, examTime: exam.examTime*1}})
      const examID = examData.data.createExam.id
      await createGraphqlFile(examID)
    }else{
      await createGraphqlFile(exam.id)
    }
  }

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
        showAlert("error", "Filled the required fields!")
        return
      }
    }
    if(activeStep === 1){
      if (
        exam.examTime === ""){
          showAlert("error", "Filled the required field!")
          return
      }
    }
    if(activeStep === 2){
      if (
        file.problemPDF === ""){
          showAlert("error", "Upload the question file!")
          return
      }
    }
    setActiveStep(activeStep + 1);
    if(activeStep === steps.length-1){
      handleUpload();
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
                        addCourse={addCourse}
                        setAddCourse={setAddCourse}
                        showAlert={showAlert}
                        setAddExam={setAddExam}
                      />
                  case 1:
                    return <ExamForm 
                        updateExam={updateExam}
                        exam={exam}
                        addCourse={addCourse}
                        addExam={addExam}
                        setAddExam={setAddExam}
                        showAlert={showAlert}
                        course={course}
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
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert?.open}
        autoHideDuration={3000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert variant="filled" severity={alert?.severity}>
          {alert?.msg}
        </Alert>
      </Snackbar>
    </ThemeProvider>
    ));
}