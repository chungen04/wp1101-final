import {gql} from "@apollo/client";

export const USER_SEARCH_QUERY = gql`
    query(
        $year_semester:String
        $courseDept: String
        $courseName: String
        $type: String
    ){
        courses(
            filter:{
                year_semester: $year_semester
                department: $courseDept
                courseName: $courseName
                courseType: $type
            }
        ){
            id
            year_semester
            courseName
            instructors
            department
            courseType
            exams{
                id
            }
            show
        }
    }
`