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
import useAdminChangeVisibility from '../Hooks/useAdminChangeVisibility';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import{
    ADMIN_FILE_QUERY
} from "../graphql/queryForAdmin"

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

const AdminChangeFileVisibility = () => {
    const {
        fileFilter,
        setFileFilter,
        queryData,
        setQueryData,
        CardForFile
    } = useAdminChangeVisibility();
    const classes = useStyles();
    const navigate = useNavigate();

    const {loading, data, subscribeToMore} = useQuery(ADMIN_FILE_QUERY, {
        variables: {
            ...fileFilter
        }
    })
    const [query, setQuery] = useState(true);

    const handleQuery = () =>{
        console.log(fileFilter)
        setQuery(true);
    }
    useEffect(() =>{
        if(!localStorage.getItem("token")){
            navigate("/adminSignIn")
        }
        console.log(query)
        if (!data) return;
        if (query){
            console.log(data.courses);
            console.log(queryData);
            const exams = []
            data.courses.map((e) =>{
                e.exams.map((f) =>{
                    exams.push({
                        ...e,
                        ...f,
                        examId: f.id
                    })
                })
            })
            const FilteredExams = exams.filter(e =>{
                let a = true;
                let b = true;
                if(fileFilter.examTime){
                    if(e.examTime !== fileFilter.examTime){
                        a = false;
                    }
                }
                if(fileFilter.examName){
                    if(e.examName !== fileFilter.examName){
                        b = false;
                    }
                }
                console.log(a && b);
                return a && b;
            })
            const files = []
            FilteredExams.map((e) =>{
                e.files.map((f) =>{
                    files.push({
                        ...e,
                        ...f,
                        fileId: f.id,
                    })
                })
            })
            files.forEach(element => {
                delete element['exams'];
                delete element['files'];
            });
            console.log(files)
            setQueryData(files);
        }
    }, [data, query]);

    return (
        <Wrapper>
        <StyledPaper elevation={3}>
        <InTextWrapper>
            <Box py = {3} px = {3}>
                <Typography variant="h4" align = "center">
                Select the File you would like to modify visibility/delete.
                </Typography><br></br>
            </Box>
            <StyledFormControl>
                <FileSelection 
                    fileFilter={fileFilter}
                    setFileFilter = {setFileFilter}
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
                    <CardForFile content = {e}/>
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

export default AdminChangeFileVisibility;