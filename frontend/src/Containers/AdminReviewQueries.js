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
    Switch
} from '@mui/material';

import styled from 'styled-components';
import React from "react";
import useAdminReviewQueries from '../Hooks/useAdminReviewQueries';

import { 
    useQuery,
    useMutation
} from '@apollo/client';

import { ADMIN_CHECK_SUBMISSION_QUERY } from '../graphql/queryForAdmin';
import { 
    DELETE_SUBMISSION_FOR_ADMIN,
    PASS_AND_SHOW_SUBMISSION_FOR_ADMIN,
    SET_EXAM_SHOW_FOR_ADMIN,
    SET_COURSE_SHOW_FOR_ADMIN
} from '../graphql/mutationForAdmin';

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

const AdminReviewQueries = () => {
    const {
        files,
        setFiles,
        Card
    } = useAdminReviewQueries();
    const classes = useStyles();

    const variables = {}
    const {loading, data, subscribeToMore} = useQuery(ADMIN_CHECK_SUBMISSION_QUERY)
    const [handleDelete] = useMutation(DELETE_SUBMISSION_FOR_ADMIN);
    const [handlePassAndShow] = useMutation(PASS_AND_SHOW_SUBMISSION_FOR_ADMIN);
    const [setExamShow] = useMutation(SET_EXAM_SHOW_FOR_ADMIN);
    const [setCourseShow] = useMutation(SET_COURSE_SHOW_FOR_ADMIN);
    console.log(data)

    let Files = []
    try{
        data.courses.map(e =>{
            e.exams.map(f =>{
                f.files.map(g =>{
                    if(!g.pass){
                        Files.push({
                            ...e,
                            ...f,
                            ...g,
                            courseId: e.id,
                            examId: f.id
                        })
                    }
                })
            })
        })
        Files.forEach(element => {
            delete element['exams'];
            delete element['files'];
            delete element['__typename'];
            delete element['pass'];
            delete element['show'];
        });
        console.log(Files)
    }catch(e){}
    

    return (
        <Wrapper>
        <StyledPaper elevation={3}>
        <InTextWrapper>
            <Box py = {3} px = {20}><Typography variant="h4" align = "center">
            Check the Submission <br></br>
                From the users.
            </Typography></Box>
            <ContentPaper variant="outlined" >
            {
                Files.map((e) =>
                    <Card 
                        content = {e} 
                        handleDelete = {handleDelete} 
                        handlePassAndShow = {handlePassAndShow}
                        setExamShow = {setExamShow}
                        setCourseShow = {setCourseShow}
                    />
                )
            }
        </ContentPaper>
        </InTextWrapper>
        </StyledPaper>
        </Wrapper>
    );
};

export default AdminReviewQueries;