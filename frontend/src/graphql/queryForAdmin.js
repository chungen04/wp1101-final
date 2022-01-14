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

export const ADMIN_COURSE_QUERY = gql`
    query(
        $year: Int
        $Semester: String
        $courseDept: String
        $courseName: String
        $courseType: String
    ){
        courses(
            filter:{
                year: $year
                semester: $Semester
                department: $courseDept
                courseName: $courseName
                courseType: $courseType
            }
        ){
            id
            year
            semester
            courseName
            instructors
            department
            courseType
            show
            exams{
                id
            }
        }
    }
`

export const ADMIN_EXAM_QUERY = gql`
query courses(
        $year: Int
        $semester: String
        $courseName: String
        $department: String
        $courseType: String
        $instructors: String
    ){
        courses(
            filter: {
                year: $year
                semester: $semester
                courseName: $courseName
                department: $department
                courseType: $courseType
                instructors: $instructor
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
`

export const ADMIN_FILE_QUERY = gql`
query courses(
        $year: Int
        $semester: String
        $courseName: String
        $department: String
        $courseType: String
        $instructors: String
    ){
        courses(
            filter: {
                year: $year
                semester: $semester
                courseName: $courseName
                department: $department
                courseType: $courseType
                instructors: $instructor
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
`