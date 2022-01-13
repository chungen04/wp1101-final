import {gql} from "@apollo/client";

export const DELETE_SUBMISSION_FOR_ADMIN = gql`
    mutation (
        $fileId: ID! 
    ){
        deleteFile(
            fileID: $fileId
        )
    }
`

export const PASS_AND_SHOW_SUBMISSION_FOR_ADMIN = gql`
    mutation (
        $fileId: ID! 
    ){
        updateFile(
            data:{
                pass: true,
                show: true
            }
            fileID: $fileId
        ){
            id
        }
    }
`

export const SET_EXAM_SHOW_FOR_ADMIN = gql`
    mutation (
        $examId: ID! 
    ){
        updateExam(
            data:{
                show: true
            }
            examID: $examId
        ){
            id
        }
    }
`

export const SET_COURSE_SHOW_FOR_ADMIN = gql`
    mutation (
        $courseId: ID! 
    ){
        updateCourse(
            data:{
                show: true
            }
            courseID: $courseId
        ){
            id
        }
    }
`