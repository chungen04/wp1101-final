import {useState} from "react";


const useSearchPage = () =>{
    const [queryFiles, setFiles] = useState([]);
    const [queryYear, setQueryYear] = useState();
    const [queryProperty, setQueryProperty] = useState('');
    const [queryType, setQueryType] = useState();
    const [querySemester, setQuerySemester] = useState('Fall')
    const [queryCourseDept, setQueryCourseDept] = useState('')
    const [queryCourseName, setQueryCourseName] = useState('')
    const [queryInstructor, setQueryInstructor] = useState('')
    const [queryAnswer, setQueryAnswer] = useState(false)

    const Semester = ["All", "Fall", "Spring", "Summer"];
    const Types = ["All", "Required", "Elective", "Liberal"];

    return {
        Semester,
        Types,
        queryFiles,
        queryYear,
        queryProperty,
        queryType,
        querySemester,
        queryCourseDept,
        queryCourseName,
        queryInstructor,
        queryAnswer,
        setFiles,
        setQueryType,
        setQueryYear,
        setQueryProperty,
        setQuerySemester,
        setQueryCourseDept,
        setQueryCourseName,
        setQueryInstructor,
        setQueryAnswer
    };
}

export default useSearchPage;