import {
    Button,
    FormControl,
    Paper,
    TextField,
    Typography,
    makeStyles,
    Box
} from '@material-ui/core';

import {
    Grid,
    FormControlLabel,
    Switch,
    Select,
    MenuItem
} from '@mui/material';

import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import useAdminChangeVisibility from '../Hooks/useAdminChangeVisibility';
import { useQuery } from '@apollo/client';

import{
    ADMIN_COURSE_QUERY,
    ADMIN_EXAM_QUERY,
    ADMIN_FILE_QUERY
} from "../graphql/queryForAdmin"

import CourseSelection from "../Components/CourseSelection"
import ExamSelection from "../Components/ExamSelection"
import FileSelection from "../Components/FileSelection"

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

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1em;
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

const AdminChangeVisibility = () => {
    const {
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
        Card
    } = useAdminChangeVisibility();
    const classes = useStyles();

    const {loading, data, subscribeToMore} = useQuery(ADMIN_COURSE_QUERY, {
        variables: {
            ...courseFilter
        }
    })
    const [query, setQuery] = useState(true);
    console.log(query);
     /*const {loading, data, subscribeToMore} = useQuery(ADMIN_EXAM_QUERY, {
        variables: examFilter
    })
    const {loading, data, subscribeToMore} = useQuery(ADMIN_FILE_QUERY, {
        variables: fileFilter
    })*/
    const handleQuery = () =>{
        console.log(courseFilter)
        console.log(data.courses);
        setQuery(true);
    }
    useEffect(() =>{
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
                Select Document Type you would like to modify visibility/delete.
                </Typography><br></br>
            </Box>
            <Select
                value = {documentType}
                label="Document Type"
                onChange={(event) => {
                    setDocumentType(event.target.value)
                    setQueryData([])
                }}
            >
                <MenuItem value={"Course"}>Course</MenuItem>
                <MenuItem value={"Exam"}>Exam</MenuItem>
                <MenuItem value={"File"}>File</MenuItem>
            </Select> 
            <StyledFormControl>
            
            {
                (()=>{
                    switch(documentType){
                      case "Course":
                        return <CourseSelection 
                            courseFilter={courseFilter}
                            setCourseFilter = {setCourseFilter}
                            query = {query}
                            setQuery = {setQuery}
                        />
                      case "Exam":
                        return <ExamSelection 
                            examFilter = {examFilter}
                            setExamFilter = {setExamFilter}
                            setQuery = {setQuery}
                        />
                      case "File":
                        return <FileSelection 
                            fileFilter = {fileFilter}
                            setFileFilter = {setFileFilter}
                        />
                      default:
                        return <></>
                    }
                  })()            
            }
            
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
                <Card content = {e}/>
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

export default AdminChangeVisibility;