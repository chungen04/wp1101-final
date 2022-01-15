import {
    FormControl,
    Paper,
    Typography,
    makeStyles,
    Box
} from '@material-ui/core';

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import NewReleasesIcon from '@mui/icons-material/NewReleases';

import styled from 'styled-components';
import React from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useAdminReviewQueries from '../Hooks/useAdminReviewQueries';

import { 
    useQuery,
    useMutation,
} from '@apollo/client';

import { ADMIN_CHECK_SUBMISSION_QUERY } from '../graphql/queryForAdmin';
import { ADMIN_REVIEW_SUBSCRIPTION } from '../graphql';
import { 
    DELETE_SUBMISSION_FOR_ADMIN,
    PASS_AND_SHOW_SUBMISSION_FOR_ADMIN,
    SET_EXAM_SHOW_FOR_ADMIN,
    SET_COURSE_SHOW_FOR_ADMIN,
    PASS_AND_NOT_SHOW_SUBMISSION_FOR_ADMIN
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

const AdminReviewQueries = (props) => {
    const navigate = useNavigate();
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
    const [handlePassAndNotShow] = useMutation(PASS_AND_NOT_SHOW_SUBMISSION_FOR_ADMIN);
    const [setExamShow] = useMutation(SET_EXAM_SHOW_FOR_ADMIN);
    const [setCourseShow] = useMutation(SET_COURSE_SHOW_FOR_ADMIN);

    let Files = [];
    useEffect(() =>{
        if(!localStorage.getItem("token")){
            navigate("/adminSignIn")
        }
        let Files = [];
        try{
            console.log(data)
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
            });
            console.log(files)
            console.log(Files)
            setFiles(Files);
        }catch(e){
            console.log(e);
        }
    }, [data])

    useEffect(()=> {
        try{
            subscribeToMore({
                document: ADMIN_REVIEW_SUBSCRIPTION,
                updateQuery: (prev, {subscriptionData}) => {
                    const {data, mutation, courseID} = subscriptionData;
                    console.log(prev);
                    return {
                        ...prev,
                        courses: [...prev.courses, data]
                    }
                }
            })
        }catch(e){
            console.log(e);
        }
    }, [subscribeToMore])

    return (
        <Wrapper>
        <StyledPaper elevation={3}>
        <InTextWrapper>
            <Box py = {3} px = {20}>
                <Typography variant="h4" align = "center">
                    Check the Submission <br></br>
                    From the users.
                </Typography><Typography variant="body2">
                    Options:<br></br>
                    <DeleteIcon color = "action"/> Delete the submission from the user.<br></br>
                    <CheckIcon color = "success"/> Pass the submission and set it visible to the users.<br></br>
                    <NewReleasesIcon color = "action"/> Pass the submission while set it invisible to the users. (You may modify the visiblilty on another admin page)
                </Typography>
            </Box>
            <ContentPaper variant="outlined" >
            {
                files.map((e) =>
                    <Card 
                        content = {e} 
                        handleDelete = {handleDelete} 
                        handlePassAndShow = {handlePassAndShow}
                        handlePassAndNotShow = {handlePassAndNotShow}
                        setExamShow = {setExamShow}
                        setCourseShow = {setCourseShow}
                        //handleClick = {handleClick}
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