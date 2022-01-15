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
    ADMIN_EXAM_QUERY
} from "../graphql/queryForAdmin"

import{
    CHANGE_EXAM_VISIBILITY_FOR_ADMIN,
    DELETE_EXAM_FOR_ADMIN
} from "../graphql/mutationForAdmin"
import { ADMIN_CHANGE_EXAM_SUBSCRIPTION } from '../graphql';
import ExamSelection from "../Components/ExamSelection"

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

const AdminChangeExamVisibility = () => {
    const navigate = useNavigate();
    const {
        examFilter,
        setExamFilter,
        queryData,
        setQueryData,
        CardForExam
    } = useAdminChangeVisibility();
    const classes = useStyles();

    const [handleDelete] = useMutation(DELETE_EXAM_FOR_ADMIN);
    const [handleChangeVisibility] = useMutation(CHANGE_EXAM_VISIBILITY_FOR_ADMIN);
    const [query, setQuery] = useState({});
    const {loading, data, subscribeToMore} = useQuery(ADMIN_EXAM_QUERY, {
        variables: {
            ...query
        }
    })
    console.log(data)

    const handleQuery = () =>{
        setQuery({...examFilter});
    }
    useEffect(() =>{
        if(!localStorage.getItem("token")){
            navigate("/adminSignIn")
        }
        console.log(data)
        if (!data) return;
        if (true){
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
                if(examFilter.examTime){
                    if(e.examTime !== examFilter.examTime){
                        a = false;
                    }
                }
                if(examFilter.examName){
                    if(e.examName !== examFilter.examName){
                        b = false;
                    }
                }
                return a && b;
            })
            setQueryData(FilteredExams);
        }
        try {
            subscribeToMore({
                document: ADMIN_CHANGE_EXAM_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const {courseID, examID, mutation} = subscriptionData.data.exam;
                    if (mutation === "DELETED"){
                        
                        const courses = prev.courses.filter((course)=>{
                            return course.id !==courseID
                        })
                        const course = prev.courses.filter((course)=>{
                            return course.id ===courseID
                        })[0];
                        const exams = course.exams.filter((exam) => {
                            return exam.id !== examID
                        })
                        console.log(courses)
                        console.log(course)
                        console.log(exams)
                        console.log(prev)
                        const newCourse = {
                            ...prev,
                            courses: [...courses, {...course, exams: exams}]
                        }
                        console.log(newCourse)
                        return newCourse
                    }else if (mutation === "UPDATED"){
                        const {show} = subscriptionData.data.exam.data
                        console.log(subscriptionData)
                        const courses = prev.courses.map((course)=>{
                            if (course.id !==courseID){
                                return course;
                            }else{
                                const exams = course.exams.map((exam)=> {
                                    if (exam.id !== examID){
                                        return exam
                                    }else{
                                        return {...exam, show}
                                    }
                                })
                                return {...course, exams}
                            }
                        })
                        const result = {...prev, courses: courses}
                        console.log(result)
                        return result
                    }
                },
            });
        } catch (e) {}
    }, [data, subscribeToMore])

    return (
        <Wrapper>
        <StyledPaper elevation={3}>
        <InTextWrapper>
            <Box py = {3} px = {3}>
                <Typography variant="h4" align = "center">
                Select the Exam you would like to modify visibility/delete.
                </Typography><br></br>
            </Box>
            <StyledFormControl>
                <ExamSelection 
                    examFilter={examFilter}
                    setExamFilter = {setExamFilter}
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
                    <CardForExam 
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

export default AdminChangeExamVisibility;