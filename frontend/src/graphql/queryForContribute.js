import {gql} from "@apollo/client"

const COURSES_QUERY = gql`
    query courses(
        $year: Int
        $semester: String
        $courseName: String
        $department: String
        $courseType: String
    ){
        coursesForContribute(
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
        }
    }
`;

const EXAMS_QUERY = gql`
    query exams(
        $courseID: String!
    ){
        examsForContribute(
            courseID: $courseID
        ){
            id
            examName
            examTime
        }
    }
`;

export {
    COURSES_QUERY,
    EXAMS_QUERY
}
