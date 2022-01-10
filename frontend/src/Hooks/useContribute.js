import { useState } from "react"

const useContribute = () => {
    const [course, setCourse] = useState({
        "semester": "Fall", 
        "year": "", 
        "type": "Required", 
        "courseName": "", 
        "department": "", 
        "instructors": ""
    })
    const [exam, setExam] = useState({
        "examName": "Midterm",
        "examTime": ""
    })
    const [file, setFile] = useState({
        "remarks": "", 
        "problemPDF": "",
        "answerPDF": ""
    })
    
    const updateCourse = (courseObj) => {
        setCourse({...course, ...courseObj})
    }
    const updateExam = (examObj) => {
        setExam({...exam, ...examObj})
    }
    const updateFile = (fileObj) => {
        setFile({...file, ...fileObj})
    }

    return {
        updateCourse,
        updateExam,
        updateFile,
        course,
        exam,
        file
    }
}

export default useContribute;
