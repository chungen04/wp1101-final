import {gql} from "@apollo/client"

export const ADMIN_REVIEW_SUBSCRIPTION = gql`
    subscription{
        course{
            data{
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
            courseID
            mutation
        }
    }
`

export const ADMIN_CHANGE_COURSE_SUBSCRIPTION = gql`
    subscription{
        course{
            data{
                show
            }
            courseID
            mutation
        }
    }
`

export const ADMIN_CHANGE_EXAM_SUBSCRIPTION = gql`
    subscription
    {
        exam(
            courseID: "0"
        ){
            data{
                show
            }
            examID
            courseID
            mutation
        }
    }
`
