import * as React from 'react';
import {
  Typography, 
  List, 
  ListItem, 
  ListItemText
} from '@mui/material';

const courseKeys = ["semester", "year", "type", "courseName", "department", "instructors"]
const examKeys = ["examName", "examTime"]
const fileKeys = ["remarks"]

export default function Review(props) {
  const {course, exam, file} = props
  console.log(props)
  return (
    <React.Fragment>
      <Typography variant="h5" gutterBottom>
        Submission summary
      </Typography>
      <List disablePadding>
        <Typography variant="h6" gutterBottom>
          Course
        </Typography>
        {courseKeys.map((key) => (
          <ListItem key={key} sx={{ py: 0.5, px: 3 }}>
            <ListItemText primary={key}/>
            <Typography variant="body2">{course[key]}</Typography>
          </ListItem>
        ))}
        <Typography variant="h6" gutterBottom>
          Exam
        </Typography>
        {examKeys.map((key) => (
          <ListItem key={key} sx={{ py: 0.5, px: 3 }}>
            <ListItemText primary={key}/>
            <Typography variant="body2">{exam[key]}</Typography>
          </ListItem>
        ))}
        <Typography variant="h6" gutterBottom>
          File
        </Typography>
        {fileKeys.map((key) => (
          <ListItem key={key} sx={{ py: 1, px: 3 }}>
            <ListItemText primary={key}/>
            <Typography variant="body2">{file[key] === "" ? "none": file[key]}</Typography>
          </ListItem>
        ))}
        <ListItem key="problem" sx={{ py: 1, px: 3 }}>
          <ListItemText primary="problemPDF"/>
          <Typography variant="body2">{file.problemPDF === "" ? "none" : file.problemPDF.name}</Typography>
        </ListItem>
        <ListItem key="answer" sx={{ py: 1, px: 3 }}>
          <ListItemText primary="answerPDF"/>
          <Typography variant="body2">{file.answerPDF === "" ? "none" : file.answerPDF.name}</Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
}