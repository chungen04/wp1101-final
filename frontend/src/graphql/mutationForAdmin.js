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

export const PASS_AND_NOT_SHOW_SUBMISSION_FOR_ADMIN = gql`
    mutation (
        $fileId: ID! 
    ){
        updateFile(
            data:{
                pass: true,
                show: false
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

export const CHANGE_COURSE_VISIBILITY_FOR_ADMIN = gql`
    mutation (
        $courseId: ID!
        $show: Boolean!
    ){
        updateCourse(
            data:{
                show: $show
            }
            courseID: $courseId
        ){
            id
        }
    }
`

export const CHANGE_EXAM_VISIBILITY_FOR_ADMIN = gql`
    mutation (
        $examId: ID!
        $show: Boolean!
    ){
        updateExam(
            data:{
                show: $show
            }
            examID: $examId
        ){
            id
        }
    }
`

export const CHANGE_FILE_VISIBILITY_FOR_ADMIN = gql`
    mutation (
        $fileId: ID!
        $show: Boolean!
    ){
        updateFile(
            data:{
                show: $show
            }
            fileID: $fileId
        ){
            id
        }
    }
`

export const DELETE_COURSE_FOR_ADMIN = gql`
    mutation (
        $courseId: ID!
    ){
        deleteCourse(
            courseID: $courseId
        )
    }
`

export const DELETE_EXAM_FOR_ADMIN = gql`
    mutation (
        $examId: ID!
    ){
        deleteExam(
            examID: $examId
        )
    }
`

export const DELETE_FILE_FOR_ADMIN = gql`
    mutation (
        $fileId: ID!
    ){
        deleteFile(
            fileID: $fileId
        )
    }
`