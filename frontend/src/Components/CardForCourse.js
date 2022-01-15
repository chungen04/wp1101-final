import React from "react";

import {
    CardContent,
    Card,
    Divider,
    Grid,
    Collapse, 
    Switch,
    FormControlLabel
} from '@mui/material';
import {
    Button,
    Typography
} from '@material-ui/core';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

import{
    CHANGE_COURSE_VISIBILITY_FOR_ADMIN,
    DELETE_COURSE_FOR_ADMIN
} from "../graphql/mutationForAdmin"
import { 
    useMutation
} from '@apollo/client';

const CardForCourse = ({courseData}) => {
    const [handleDelete] = useMutation(DELETE_COURSE_FOR_ADMIN);
    const [handleChangeVisibility] = useMutation(CHANGE_COURSE_VISIBILITY_FOR_ADMIN);
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return(
        <Card sx={{my: 2}} style={{backgroundColor: "#00000011"}}>
            <CardContent>
                <Grid container>
                    <Grid item xs>
                        <Typography variant="h5" component="div">
                            {[courseData.courseName, courseData.department].join(" - ")}
                        </Typography>
                        <Typography variant="h6" component="div">
                            {[courseData.year, courseData.semester].join(" - ")}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                            Instructor: {courseData.instructors}
                        </Typography>
                        <Typography variant="body2">
                            Currently Show: {courseData.show? "true": "false"}
                        </Typography>
                        <Typography variant="body2">
                            Exams contained: {courseData.exams.length}
                        </Typography>
                    </Grid>
                <Divider orientation="vertical" flexItem/>
                    <Grid item xs>
                        <Typography variant="h6" component = "div">  
                            &nbsp;&nbsp;Options
                        </Typography>
                        <Button 
                            onClick = {() =>{
                                handleDelete({
                                    variables:{
                                        courseId: courseData.id
                                    }
                                })
                            }}
                            >
                        <DeleteIcon color = "action"/> Delete this Course
                        </Button><br></br>
                        <Button 
                            onClick = {() =>{
                                handleChangeVisibility({
                                    variables:{
                                        courseId: courseData.id,
                                        show: !courseData.show
                                    }
                                })
                            }
                        }>
                            <RefreshIcon color = "action"/> Change Visibility
                        </Button><br></br>
                        {/* <FormControlLabel
                        value="Show Course"
                        control={<Switch checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />}
                        label="Show Course"
                        labelPlacement="end"
                        /> */}
                    </Grid>
                </Grid>
            </CardContent>
            {/* <Collapse in={checked} timeout="auto" unmountOnExit>
                
            </Collapse> */}
        </Card>
    )
};

export default CardForCourse;