import {useState} from "react";

const useSearchPage = () =>{
    const [queryYear, setQueryYear] = useState(0);
    const [queryProperty, setQueryProperty] = useState('');
    const [queryType, setQueryType] = useState('');
    const [querySemester, setQuerySemester] = useState('')
    const [queryCourseDept, setQueryCourseDept] = useState('')
    const [queryCourseName, setQueryCourseName] = useState('')
    const [queryInstructor, setQueryInstructor] = useState('')
    const [queryAnswer, setQueryAnswer] = useState(false)

    const Semester = ["Default", "Fall", "Spring", "Summer"];
    const Types = ["Default", "Midterm", "Final", "Quiz", ];
    const Property = ["Default", "Required", "Elective", "Liberal"];

    const handleQuery = () =>{

    };
    return {
        Semester,
        Types,
        Property,
        queryYear,
        queryProperty,
        queryType,
        querySemester,
        queryCourseDept,
        queryCourseName,
        queryInstructor,
        queryAnswer,
        handleQuery,
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