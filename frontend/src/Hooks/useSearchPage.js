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
    ListItemText
} from '@mui/material';

import {
    Button,
    Typography
} from '@material-ui/core';

const useSearchPage = () =>{
    const [queryFiles, setFiles] = useState([]);
    const [queryYear, setQueryYear] = useState();
    const [queryProperty, setQueryProperty] = useState('');
    const [queryType, setQueryType] = useState();
    const [querySemester, setQuerySemester] = useState('Fall')
    const [queryCourseDept, setQueryCourseDept] = useState('')
    const [queryCourseName, setQueryCourseName] = useState('')
    const [queryInstructor, setQueryInstructor] = useState('')
    const [queryAnswer, setQueryAnswer] = useState(false);

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
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
            {[year, semester].join("-")}
            </Typography>
            <Typography sx={{ fontSize: 14 }} gutterBottom>
              Course/Exam: {[courseName, examName].join(" ")}
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
            <Dialog open = {showMore} onClose = {() => setShowMore(false)} maxWidth>
            <DialogContent dividers>
                {ShowMore(content)}
                </DialogContent>
            </Dialog>
          </CardActions>
        </React.Fragment>
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