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
import { 
    useQuery,
    useMutation
} from '@apollo/client';

import{
    ADMIN_COURSE_QUERY,
} from "../graphql/queryForAdmin"

import{
    CHANGE_COURSE_VISIBILITY_FOR_ADMIN,
    DELETE_COURSE_FOR_ADMIN
} from "../graphql/mutationForAdmin"

import CourseSelection from "../Components/CourseSelection"

const Wrapper = styled.div`
    margin: auto;
    width: 60%;
    height: 100vh;
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

const ContentPaper = styled(Paper)`
    height: 300px;
    padding: 2em;
    overflow: auto;
`;

const StyledPaper = styled(Paper)`
    padding: 2em;
`;

const AdminChangeCourseVisibility = () => {
    const {
        courseFilter,
        setCourseFilter,
        queryData,
        setQueryData,
        CardForCourse
    } = useAdminChangeVisibility();
    const navigate = useNavigate();
    const classes = useStyles();
    const [handleDelete] = useMutation(DELETE_COURSE_FOR_ADMIN);
    const [handleChangeVisibility] = useMutation(CHANGE_COURSE_VISIBILITY_FOR_ADMIN);

    const {loading, data, subscribeToMore} = useQuery(ADMIN_COURSE_QUERY, {
        variables: {
            ...courseFilter
        }
    })
    const [query, setQuery] = useState(true);
    console.log(query);

    const handleQuery = () =>{
        console.log(courseFilter)
        console.log(data.courses);
        setQuery(true);
    }
    useEffect(() =>{
        if(!localStorage.getItem("token")){
            navigate("/adminSignIn")
        }
        if (!data) return;
        if (query){
            console.log(data.courses);
            console.log(queryData);
            setQueryData(data.courses);
        }
    }, [data, query]);

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
                    query = {query}
                    setQuery = {setQuery}
                />          
            </StyledFormControl>
            <br></br>
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick = {handleQuery}
            >
            Query
            </Button>
            <br></br>
        <ContentPaper variant="outlined" >
        {
            queryData.length !== 0? (
            queryData.map((e) =>
                <CardForCourse 
                    content = {e}
                    handleDelete = {handleDelete}
                    handleChangeVisibility = {handleChangeVisibility}
                />
            )
            ):(
            <Typography variant = "body2">No Documents Found...</Typography>
            )
        }
        </ContentPaper>
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