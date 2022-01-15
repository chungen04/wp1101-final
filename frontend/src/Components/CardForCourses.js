import {useEffect} from "react";
import React from "react";

import {
    Typography
} from '@material-ui/core';
import CardForCourse from "./CardForCourse";

import{
    ADMIN_COURSE_QUERY,
} from "../graphql/queryForAdmin"
import {
    ADMIN_CHANGE_COURSE_SUBSCRIPTION
} from "../graphql"

import { 
    useQuery,
} from '@apollo/client';

const CardForCourses = ({query}) => {
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
                    if (mutation === "DELETED"){
                        const courses = prev.courses.filter((course) => {
                            return course.id !== courseID
                        })
                        return {
                            ...prev, courses 
                        }
                    }else if (mutation === "UPDATED"){
                        const {show} = subscriptionData.data.course.data
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
                    <CardForCourse courseData={e}/>
                )
            ):(
            <Typography variant = "body2">No Documents Found...</Typography>
            )
        }
        </>
    )
};

export default CardForCourses;