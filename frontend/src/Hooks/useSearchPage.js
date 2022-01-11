import {useState} from "react";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React from "react";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import {
    List, 
    ListItem, 
    ListItemText
  } from '@mui/material';

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
    const [showMore, setShowMore] = useState(false);

    const Semester = ["All", "Fall", "Spring", "Summer"];
    const Types = ["All", "Required", "Elective", "Liberal"];

    const ShowMore = (props) => {
        return(
            <List disablePadding>
                <Typography variant="h6" gutterBottom>
                Details
                </Typography>
                {Object.keys(props).map((key) => (
                <ListItem key={key} sx={{ py: 0.5, px: 3 }}>
                    <ListItemText primary={key}/>
                    <Typography variant="body3">{props[key]}</Typography>
                </ListItem>
                ))}
            </List>
        )
    }
    const card = (props) => {
        const {
            year,
            semester,
            remarks,
            questionViewLink,
            questionDownloadLink,
            instructors,
            examTime,
            examName,
            department,
            courseType,
            courseName,
            answerViewLink,
            answerDownloadLink
        } = props;
        return(
        <React.Fragment>
          <CardContent>
            <Typography variant="h5" component="div">
            {[year, semester].join("-")}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Course/Exam: {[courseName, examName].join(" ")}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Instructor: {instructors}
            </Typography>
            <Typography variant="body2">
                Department: {department}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick = {() => setShowMore(true)}>Learn More</Button>
            <Dialog open = {showMore} onClose = {() => setShowMore(false)} >
            <DialogContent dividers>
                {ShowMore(props)}
                </DialogContent>
            </Dialog>
          </CardActions>
        </React.Fragment>
        )
      };

    return {
        card,
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