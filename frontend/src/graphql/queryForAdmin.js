import {gql} from "@apollo/client";

export const ADMIN_CHECK_SUBMISSION_QUERY = gql`
    query{
        courses(filter:{}){
            year
            semester
            courseName
            instructors
            department
            courseType
            id
            exams{
                examName
                examTime
                id
                files{
                    questionDownloadLink
                    questionViewLink
                    answerDownloadLink
                    answerViewLink
                    remarks
                    id
                    pass
                    examID
                }
            }
        }
    }
`