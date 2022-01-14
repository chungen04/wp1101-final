import {useState} from "react";
import React from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

import {
    CardActions,
    CardContent,
    DialogContent,
    Dialog,
    Grid,
    Box,
    List,
    ListItem, 
    ListItemText
} from '@mui/material';

import {
    Button,
    Typography
} from '@material-ui/core';

const useAdminReviewQueries = () =>{
    const [files, setFiles] = useState([]);
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
    const Card = ({content, handleDelete, handlePassAndShow, setExamShow, setCourseShow,handlePassAndNotShow}) => {
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
              Course/Exam: {[courseName, examName].join(" ")} <br></br>
              Instructor: {instructors}<br></br>
              Department: {department}<br></br>
            </Typography>
            {/*<Typography sx={{ mb: 1.5 }}>
              
            </Typography>
            <Typography variant="body2">
               
        </Typography>*/}
          </CardContent>
          <CardActions>
            <Button size="small" onClick = {() => setShowMore(true)}>Details</Button>
            <Dialog open = {showMore} onClose = {() => setShowMore(false)} maxWidth>
            <DialogContent dividers>
                {ShowMore(content)}
                </DialogContent>
            </Dialog>
          </CardActions>
            <Box>
                Options<br></br>
                <Button onClick = {() => {
                    handleDelete({
                        variables:{
                            fileId: content.id
                        }
                    })
                }}>
                <DeleteIcon color = "action"/> Delete this query
                </Button><br></br>
                <Button onClick = {() => {
                    handlePassAndShow({
                        variables:{
                            fileId: content.id
                        }
                    });
                    setExamShow({
                        variables:{
                            examId: content.examId
                        }
                    });
                    setCourseShow({
                        variables:{
                            courseId: content.courseId
                        }
                    });
                }}>
                <CheckIcon color = "success"/> Pass this query and make it visible 
                </Button><br></br>
                <Button onClick = {() => {
                    handlePassAndNotShow({
                        variables:{
                            fileId: content.id
                        }
                    });
                    setExamShow({
                        variables:{
                            examId: content.examId
                        }
                    });
                    setCourseShow({
                        variables:{
                            courseId: content.courseId
                        }
                    });
                }}>
                    <NewReleasesIcon color = "action"/> Pass this query and make it invisible
                </Button>   
            </Box>
        </React.Fragment>
        )
    };

    return{
        files,
        setFiles,
        Card
    }
}

export default useAdminReviewQueries;