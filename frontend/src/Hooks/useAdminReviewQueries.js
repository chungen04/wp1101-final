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
    Divider,
    List,
    ListItem, 
    ListItemText
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

const useAdminReviewQueries = () =>{
    const [files, setFiles] = useState([]);
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
                    if(key !== "courseId" &&
                        key !== "id" &&
                        key !== "examId" &&
                        key !== "examID" &&
                        key !== "pass"
                    ){
                        return(
                        <ListItem key={key}>
                            <ListItemText primary={key} sx={{ padding: 1 }}/>
                            <Grid item >
                            <Typography variant="body2">{
                                content[key] !== "" && content[key] ?
                                content[key] :
                                "None"
                            }</Typography>
                            </Grid>
                        </ListItem>
                        )
                    }
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
        <MaterialCard sx={{my: 2}} style={{backgroundColor: "#00000011"}}>
          <CardContent>
            <Typography variant="h5" component="div">
            {[courseName, examName].join(" - ")}
            </Typography>
            <Typography variant="h6" component="div">
              {[year, semester].join(" - ")}
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
              Instructor: {instructors}
            </Typography>
            <Typography variant="body2">
                Department: {department}
            </Typography>
            <CardActions>
                <Button size="small" onClick = {() => setShowMore(true)}>Details</Button>
                <Dialog open = {showMore} onClose = {() => setShowMore(false)} maxWidth="md" fullWidth>
                <DialogContent dividers>
                    {ShowMore(content)}
                    </DialogContent>
                </Dialog>
                
            </CardActions>
            <Divider />
            <Typography variant="h6" component = "div">
                Options
            </Typography>
          
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
            </CardContent>
        </MaterialCard>
        )
    };

    return{
        files,
        setFiles,
        Card
    }
}

export default useAdminReviewQueries;