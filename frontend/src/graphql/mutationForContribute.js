import { gql } from '@apollo/client';

const CREATE_COURSE_MUTATION = gql`
    mutation course(
        $year: Int!
        $semester: String!
        $courseName: String!
        $department: String!
        $courseType: String!
        $instructors: String!
    ){
        createCourse(
            data: {
                year: $year
                semester: $semester
                courseName: $courseName
                department: $department
                courseType: $courseType
                instructors: $instructors
            }
        ){
            id
        }
    }
`

const CREATE_EXAM_MUTATION = gql`
    mutation exam(
        $examName: String!
        $examTime: Int!
        $courseID: ID!
    ){
        createExam(
            data: {
                examName: $examName
                examTime: $examTime
            }
            courseID: $courseID
        ){
            id
        }
    }
`

const CREATE_FILE_MUTATION = gql`
    mutation file(
        $examID: ID!
        $problemID: ID!
        $problemDownloadLink: String!
        $problemViewLink: String!
        $answerID: ID
        $answerDownloadLink: String
        $answerViewLink: String
        $remarks: String
    ){
        createFile(
            data: {
                questionDriveID: $problemID
                questionDownloadLink: $problemDownloadLink
                questionViewLink: $problemViewLink
                answerDriveID: $answerID
                answerDownloadLink: $answerDownloadLink
                answerViewLink: $answerViewLink
                remarks: $remarks
            }
            examID: $examID
        ){
            id
        }
    }
`

export {
    CREATE_COURSE_MUTATION,
    CREATE_EXAM_MUTATION,
    CREATE_FILE_MUTATION
}
