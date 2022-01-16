import { useState } from "react";
import React from "react";

import {
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
} from "@mui/material";

import { Button, Typography } from "@material-ui/core";

import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

const useAdminChangeVisibility = () => {
  const [documentType, setDocumentType] = useState("");
  const [courseFilter, setCourseFilter] = useState({});
  const [examFilter, setExamFilter] = useState({});
  const [fileFilter, setFileFilter] = useState({});
  const [queryData, setQueryData] = useState([]);
  const [query, setQuery] = useState({});

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
          <Card sx={{my: 2}} style={!show? {backgroundColor: "#00000011"}: {backgroundColor: "#90F51DDD"}}>
          <CardContent>
          <Grid container>
            <Grid item xs>
              <Typography variant="h5" component="div">
                {[courseName, department, examName].join(" - ")}
              </Typography>
              <Typography variant="h6" component="div">
                {[year, semester].join(" - ")}
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                Instructor: {instructors}
              </Typography>
              <Typography variant="body2">
                ExamTime: {examTime} <br></br>
              </Typography>
              <Typography variant="body2">
                Currently Show: {show ? "true" : "false"}
              </Typography>
              <Typography variant="body2">
                Files contained: {content.files.length}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs>
              <Typography variant="h6" component="div">
                &nbsp;&nbsp;Options
              </Typography>

              <Button
                onClick={() => {
                  handleDelete({
                    variables: {
                      examId: content.examId,
                    },
                  });
                }}
              >
                <DeleteIcon color="action" /> Delete this Exam
              </Button>
              <br></br>
              <Button
                onClick={() => {
                  handleChangeVisibility({
                    variables: {
                      examId: content.examId,
                      show: !content.show,
                    },
                  });
                }}
              >
                <RefreshIcon color="action" /> Change Visibility
              </Button>
              <br></br>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  const CardForFile = ({ content, handleDelete, handleChangeVisibility }) => {
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
      remarks,
    } = content;
    return (
      <Card
        sx={{ my: 2 }}
        style={
          !show
            ? { backgroundColor: "#00000011" }
            : { backgroundColor: "#90F51DDD" }
        }
      >
        <CardContent>
          <Grid container>
            <Grid item xs>
              <Typography variant="h5" component="div">
                {[courseName, department, examName].join(" - ")}
              </Typography>
              <Typography variant="h6" component="div">
                {[year, semester].join(" - ")}
              </Typography>
              <Typography sx={{ mb: 1.5 }}>
                Instructor: {instructors}
              </Typography>
              <Typography variant="body2">
                ExamTime: {examTime} <br></br>
              </Typography>
              <Typography variant="body2">
                Currently Show: {show ? "true" : "false"}
              </Typography>
              <Typography variant="body2">
                Question View Link:
                <a href={questionViewLink}>Click Me</a>
              </Typography>
              <Typography variant="body2">
                Answer View Link:
                {answerViewLink ? (
                  <a href={answerViewLink}>Click Me</a>
                ) : (
                  "None"
                )}
              </Typography>
              <Typography variant="body2">Remarks: {remarks}</Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs>
              <Typography variant="h6" component="div">
                &nbsp;&nbsp;Options
              </Typography>
              <Button
                onClick={() => {
                  handleDelete({
                    variables: {
                      fileId: content.fileId,
                    },
                  });
                }}
              >
                <DeleteIcon color="action" /> Delete this File
              </Button>
              <br></br>
              <Button
                onClick={() => {
                  handleChangeVisibility({
                    variables: {
                      fileId: content.fileId,
                      show: !content.show,
                    },
                  });
                }}
              >
                <RefreshIcon color="action" /> Change Visibility
              </Button>
              <br></br>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  return {
    query,
    setQuery,
    CardForExam,
    CardForFile,
    documentType,
    setDocumentType,
    courseFilter,
    setCourseFilter,
    examFilter,
    setExamFilter,
    fileFilter,
    setFileFilter,
    queryData,
    setQueryData,
  };
};

export default useAdminChangeVisibility;