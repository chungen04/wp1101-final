import {gql} from "@apollo/client";

export const USER_SEARCH_QUERY = gql`
    query(
        $year: Int
        $semester: String
        $courseDept: String
        $courseName: String
        $type: String
    ){
        courses(
            filter:{
                year: $year
                semester: $semester
                department: $courseDept
                courseName: $courseName
                courseType: $type
            }
        ){
            year
            semester
            courseName
            instructors
            department
            courseType
            exams{
                examName
                examTime
                files{
                    questionDownloadLink
                    questionViewLink
                    answerDownloadLink
                    answerViewLink
                    remarks 
                }
            }
        }
    }
`