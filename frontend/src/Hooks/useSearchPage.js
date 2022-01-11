import {useState} from "react";


const useSearchPage = () =>{
    const [queryYear, setQueryYear] = useState(0);
    const [queryProperty, setQueryProperty] = useState('');
    const [queryType, setQueryType] = useState('Default');
    const [querySemester, setQuerySemester] = useState('Fall')
    const [queryCourseDept, setQueryCourseDept] = useState('')
    const [queryCourseName, setQueryCourseName] = useState('')
    const [queryInstructor, setQueryInstructor] = useState('')
    const [queryAnswer, setQueryAnswer] = useState(false)

    const Semester = ["Fall", "Spring", "Summer"];
    const Types = ["Default", "Required", "Elective", "Liberal"];

    return {
        Semester,
        Types,
        queryYear,
        queryProperty,
        queryType,
        querySemester,
        queryCourseDept,
        queryCourseName,
        queryInstructor,
        queryAnswer,
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