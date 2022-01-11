import {gql} from "@apollo/client"

const COURSES_QUERY = gql`
    query courses(
        $year: Int
        $semester: String
        $courseName: String
        $department: String
        $courseType: String
    ){
        courses(
            filter: {
                year: $year
                semester: $semester
                courseName: $courseName
                department: $department
                courseType: $courseType
            }
        ){
            id
            year
            semester
            department
            courseName
            courseType
            instructors
            exams{
                id
                examName
            }
            show
        }
    }
`;

export {
    COURSES_QUERY
}
