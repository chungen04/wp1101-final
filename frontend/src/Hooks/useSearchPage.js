import {useState} from "react";
import React from "react";

import {
    CardActions,
    CardContent,
    DialogContent,
    Dialog,
    Grid,
    List,
    ListItem, 
    ListItemText,
} from '@mui/material';
import {Card as MaterialCard} from '@mui/material';

import {
    Button,
    Typography
} from '@material-ui/core';

const refList = {
  questionDownloadLink: "Download Question",
  questionViewLink: "View Question",
  answerDownloadLink: "Download Answer",
  answerViewLink: "View Answer"
}

const useSearchPage = () =>{
    const [queryFiles, setFiles] = useState([]);
    const [queryYear, setQueryYear] = useState();
    const [queryProperty, setQueryProperty] = useState('');
    const [queryType, setQueryType] = useState();
    const [querySemester, setQuerySemester] = useState('')
    const [queryCourseDept, setQueryCourseDept] = useState('')
    const [queryCourseName, setQueryCourseName] = useState('')
    const [queryInstructor, setQueryInstructor] = useState('')
    const [queryAnswer, setQueryAnswer] = useState(false);

    const Semester = ["All", "Fall", "Spring", "Summer"];
    const Types = ["All", "Required", "Elective", "Liberal"];

    const ShowMore = (content) => {
      return(
        <>
          <Typography variant="h4">
          Details
          </Typography>
          <List 
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: "70vh",
              '& ul': { padding: 0 },
            }}
          >
            {Object.keys(content).map((key) => {
              if(key !== "questionDownloadLink" &&
                  key !== "questionViewLink" &&
                  key !== "answerDownloadLink" &&
                  key !== "answerViewLink"
              ){
                return(
                  <ListItem key={key}>
                      <ListItemText primary={key} sx={{ padding: 1 }}/>
                      <Grid item >
                      <Typography variant="body2">
                        {
                          content[key] !== "" && content[key] ?
                          content[key] :
                          "None"
                        }
                      </Typography>
                      </Grid>
                  </ListItem>
                )
              }else{
                return(
                  <ListItem key={key}>
                    <ListItemText primary={key} sx={{ padding: 1 }}/>
                    <Grid item >
                      <Typography variant="body2">
                        {
                          content[key] !== "" && content[key] ?
                          <a href = {content[key]}>
                            {refList[key]} 
                          </a> :
                          "None"
                        }
                      </Typography>
                    </Grid>
                  </ListItem>
                )
              }
            })}
          </List>
        </>
      )
    }
    const Card = ({content}) => {
        const [showMore, setShowMore] = useState(false);
        const {
            year,
            semester,
            instructors,
            examName,
            department,
            courseName,
        } = content;
        return(
        <MaterialCard sx={{my: 2}} style={{backgroundColor: "#00000011"}}>
          <CardContent>
            <Typography variant="h5" component="div">
              {[courseName, examName].join(" - ")}
            </Typography>
            <Typography variant="h6" component="div">
              {[year, semester].join("-")}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Exam: {examName}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Instructor: {instructors}
            </Typography>
            <Typography variant="body2">
                Department: {department}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick = {() => setShowMore(true)}>Learn More</Button>
            <Dialog open = {showMore} onClose = {() => setShowMore(false)} maxWidth="md" fullWidth>
              <DialogContent dividers>
                {ShowMore(content)}
              </DialogContent>
            </Dialog>
          </CardActions>
        </MaterialCard>
        )
      };

    return {
        Card,
        Semester,
        Types,
        queryFiles,
        queryYear,
        queryProperty,
        queryType,
        querySemester,
        queryCourseDept,
        queryCourseName,
        queryInstructor,
        queryAnswer,
        setFiles,
        setQueryType,
        setQueryYear,
        setQueryProperty,
        setQuerySemester,
        setQueryCourseDept,
        setQueryCourseName,
        setQueryInstructor,
        setQueryAnswer
    };
}

export default useSearchPage;