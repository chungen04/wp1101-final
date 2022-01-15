import {useEffect} from "react";
import React from "react";

import {
    CardContent,
    Card,
    Divider
} from '@mui/material';
import {
    Button,
    Typography
} from '@material-ui/core';
import {
    Paper
} from '@material-ui/core';

import styled from 'styled-components';

import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

import{
    ADMIN_COURSE_QUERY,
} from "../graphql/queryForAdmin"
import {
    ADMIN_CHANGE_COURSE_SUBSCRIPTION
} from "../graphql"

import{
    CHANGE_COURSE_VISIBILITY_FOR_ADMIN,
    DELETE_COURSE_FOR_ADMIN
} from "../graphql/mutationForAdmin"
import { 
    useQuery,
    useMutation
} from '@apollo/client';

const ContentPaper = styled(Paper)`
    height: 300px;
    padding: 2em;
    overflow: auto;
`;

const CardForCourse = ({query}) => {
    const [handleDelete] = useMutation(DELETE_COURSE_FOR_ADMIN);
    const [handleChangeVisibility] = useMutation(CHANGE_COURSE_VISIBILITY_FOR_ADMIN);
    const {loading, data, subscribeToMore} = useQuery(ADMIN_COURSE_QUERY, {
        variables: {
            ...query
        }
    })

    useEffect(() => {
        try {
            subscribeToMore({
                document: ADMIN_CHANGE_COURSE_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const {courseID, mutation} = subscriptionData.data.course;
                    const {show} = subscriptionData.data.course.data
                    if (mutation === "DELETED"){
                        const courses = prev.courses.filter((course) => {
                            return course.id !== courseID
                        })
                        return {
                            ...prev, courses 
                        }
                    }else if (mutation === "UPDATED"){
                        const courses = prev.courses.map((course)=> {
                            if(course.id === courseID){
                                console.log(show)
                                return {...course, show}
                            }else{
                                return course
                            }
                        })
                        return {
                            ...prev, courses 
                        }
                    }
                },
            });
        } catch (e) {}
    }, [subscribeToMore])

    return(
        <>
        {
            !data ? loading :
            data.courses.length !== 0 ? (
            data.courses.map((e) =>
                <Card sx={{my: 2}} style={{backgroundColor: "#00000011"}}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {[e.courseName, e.department].join(" - ")}
                        </Typography>
                        <Typography variant="h6" component="div">
                            {[e.year, e.semester].join(" - ")}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }}>
                            Instructor: {e.instructors}
                        </Typography>
                        <Typography variant="body2">
                            Currently Show: {e.show? "true": "false"}
                        </Typography>
                        <Typography variant="body2">
                            Exams contained: {e.exams.length}
                        </Typography>
                        </CardContent>
                        <Divider />
                        <Typography variant="h6" component = "div">  
                            &nbsp;&nbsp;Options
                        </Typography>
                        <Button onClick = {() =>{
                            handleDelete({
                                variables:{
                                courseId: e.id
                                }
                            })
                        }}>
                            <DeleteIcon color = "action"/> Delete this Course
                        </Button><br></br>
                        <Button onClick = {() =>{
                        handleChangeVisibility({
                            variables:{
                            courseId: e.id,
                            show: !e.show
                            }
                        })
                        }}>
                            <RefreshIcon color = "action"/> Change Visibility
                        </Button><br></br>
                    </Card>
                )
            ):(
            <Typography variant = "body2">No Documents Found...</Typography>
            )
        }
        </>
    )
};

export default CardForCourse;