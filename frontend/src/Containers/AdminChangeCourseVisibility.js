import {
    Button,
    FormControl,
    Paper,
    Typography,
    makeStyles,
    Box
} from '@material-ui/core';

import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useAdminChangeVisibility from '../Hooks/useAdminChangeVisibility';

import SearchIcon from '@mui/icons-material/Search';
import CourseSelection from "../Components/CourseSelection"
import CardForCourses from '../Components/CardForCourses';

const Wrapper = styled.div`
  margin: 2vh auto;
  width: 60%;
  height: 96vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const useStyles = makeStyles({
    input: {
        margin: '0 0.2em',
    },
    button: {
        width: '100px',
        marginLeft: '0.6em',
    },
});

const InTextWrapper = styled.section`
    display: flex;
    flex-direction: column;
`;

const StyledFormControl = styled(FormControl)`
    min-width: 120px;
`;

const StyledPaper = styled(Paper)`
    padding: 2em;
    max-height: 90vh;
    overflow: auto;
`;

const AdminChangeCourseVisibility = () => {
    const {
        courseFilter,
        setCourseFilter,
        query,
        setQuery
    } = useAdminChangeVisibility();
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() =>{
        if(!localStorage.getItem("token")){
            navigate("/adminSignIn")
        }
    }, []);

    const handleQuery = () => {
        const newCourseFilter = {...courseFilter}
        setQuery(newCourseFilter)
    }

    return (
        <Wrapper>
        <StyledPaper elevation={3}>
        <InTextWrapper>
            <Box py = {3} px = {3}>
                <Typography variant="h4" align = "center">
                Select the Course you would like to modify visibility/delete.
                </Typography><br></br>
            </Box>
            <StyledFormControl>
                <CourseSelection 
                    courseFilter={courseFilter}
                    setCourseFilter = {setCourseFilter}
                />          
            </StyledFormControl>
            <br></br>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={handleQuery}
                startIcon = {<SearchIcon />}
            >
            Query
            </Button>
            <br></br>
            <CardForCourses 
                query={query}
            />
        </InTextWrapper>
        </StyledPaper>
        </Wrapper>
    );
};


//1. change visibility
//2. delete course/exam/file
/*how to show data:
    1. can select course. for each course, it can be either changed visibility or deleted. (in this level, number of exams contained can be known.)
    2. select each exam by course properties (which should be all filled so that the course is exact.) (in this level, number of files contained can be known.)
    3. select files by course and exam, all being exact.
    4. 
*/

export default AdminChangeCourseVisibility;