import {gql} from "@apollo/client"

const COURSES_QUERY = gql`
    query courses(
        $year_semester: String
        $courseName: String
        $department: String
        $courseType: String
    ){
        courses(
            filter: {
                year_semester: $year_semester
                courseName: $courseName
                department: $department
                courseType: $courseType
            }
        ){
            id
            year_semester
            department
            courseName
            courseType
            instructors
            show
        }
    }
`;

export {
    COURSES_QUERY
}
