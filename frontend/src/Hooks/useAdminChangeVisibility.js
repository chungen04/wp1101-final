import {useState} from "react";
import React from "react";

import {
    CardContent,
    Grid,
    List,
    ListItem, 
    ListItemText
} from '@mui/material';

import {
    Button,
    Typography
} from '@material-ui/core';

import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { handle } from "express/lib/application";

const useAdminChangeVisibility = () =>{
    const [documentType, setDocumentType] = useState("")
    const [courseFilter, setCourseFilter] = useState({})
    const [examFilter, setExamFilter] = useState({})
    const [fileFilter, setFileFilter] = useState({})
    const [queryData, setQueryData] = useState([])

    const Semester = ["All", "Fall", "Spring", "Summer"];
    const Types = ["All", "Required", "Elective", "Liberal"];

    const ShowMore = (content) => {
      return(
        <List disablePadding>
            <Typography variant="h6" gutterBottom>
            Details
            </Typography>
            {Object.keys(content).map((key) => (
            <ListItem key={key}>
                <ListItemText primary={key} sx={{ padding: 1 }}/>
                <Grid item >
                <Typography variant="body2">{content[key]}</Typography>
                </Grid>
            </ListItem>
            ))}
        </List>
      )
    }
    const CardForCourse = ({content, handleDelete, handleChangeVisibility}) => {
        const [showMore, setShowMore] = useState(false);
        const {
            year,
            semester,
            instructors,
            department,
            courseName,
            show
        } = content;
        return(
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
            {[year, semester].join("-")}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Course Name: {courseName}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Instructor: {instructors}
            </Typography>
            <Typography variant="body2">
                Department: {department}
            </Typography>
            <Typography variant="body2">
                Currently Show: {show? "true": "false"}
            </Typography>
            <Typography variant="body2">
                Exams contained: {content.exams.length}
            </Typography>
          </CardContent>
          <Typography variant="body1">
                Options:
          </Typography>
          <Button onClick = {() =>{
            handleDelete({
              variables:{
                courseId: content.id
              }
            })
          }}>
            <DeleteIcon color = "action"/> Delete this Course
          </Button><br></br>
          <Button onClick = {() =>{
            handleChangeVisibility({
              variables:{
                courseId: content.id,
                show: !content.show
              }
            })
          }}>
            <RefreshIcon color = "action"/> Change Visibility
          </Button><br></br>
        </React.Fragment>
        )
      };
      const CardForExam = ({content, handleDelete, handleChangeVisibility}) => {
        const {
            year,
            semester,
            instructors,
            department,
            courseName,
            examName,
            examTime,
            show
        } = content;
        return(
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
            {[year, semester].join("-")}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Course Name: {courseName}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Instructor: {instructors}
            </Typography>
            <Typography variant="body2">
              Department: {department}<br></br>
              Exam Name: {examName}<br></br>
              ExamTime: {examTime} <br></br>
            </Typography>
            <Typography variant="body2">
                Currently Show: {show? "true": "false"}
            </Typography>
            <Typography variant="body2">
                Files contained: {content.files.length}
            </Typography>
          </CardContent>
          <Typography variant="body1">
                Options:
          </Typography>
          <Button onClick = {() =>{
            handleDelete({
              variables:{
                examId: content.examId
              }
            })
          }}>
            <DeleteIcon color = "action"/> Delete this Exam
          </Button><br></br>
          <Button onClick = {() =>{
            console.log({
              examId: content.examId,
              show: !content.show
            })
            handleChangeVisibility({
              variables:{
                examId: content.examId,
                show: !content.show
              }
            })
          }}>
            <RefreshIcon color = "action"/> Change Visibility
          </Button><br></br>
        </React.Fragment>
        )
      };
      const CardForFile = ({content}) => {
        const {
            year,
            semester,
            instructors,
            department,
            courseName,
            examName,
            examTime,
            questionViewLink,
            answerViewLink,
            show,
            remarks
        } = content;
        return(
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
            {[year, semester].join("-")}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Course Name: {courseName}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Instructor: {instructors}
            </Typography>
            <Typography variant="body2">
              Department: {department}<br></br>
              Exam Name: {examName}<br></br>
              ExamTime: {examTime} <br></br>
              Question View Link: <a href = {questionViewLink}>{questionViewLink}</a><br></br>
              Answer View Link: <a href = {answerViewLink}>{answerViewLink}</a><br></br>
              Remarks: {remarks}
            </Typography>
            <Typography variant="body2">
                Currently Show: {show? "true": "false"}
            </Typography>
          </CardContent>
          <Typography variant="body1">
                Options:
          </Typography>
          <Button>
            <DeleteIcon color = "action"/> Delete this File
          </Button><br></br>
          <Button>
            <RefreshIcon color = "action"/> Change Visibility
          </Button><br></br>
        </React.Fragment>
        )
      };
    return {
        CardForCourse,
        CardForExam,
        CardForFile,
        Semester,
        Types,
        documentType,
        setDocumentType,
        courseFilter,
        setCourseFilter,
        examFilter,
        setExamFilter,
        fileFilter,
        setFileFilter,
        queryData,
        setQueryData
    };
}

export default useAdminChangeVisibility;