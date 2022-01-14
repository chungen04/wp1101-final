import {
    TextField,
} from '@material-ui/core';

import {
    Grid,
} from '@mui/material';
import useAdminChangeVisibility from '../Hooks/useAdminChangeVisibility';

const ExamSelection = ({examFilter, setExamFilter, setQuery}) =>{
    const {
        Semester,
        Types,
    } = useAdminChangeVisibility();
    return (
        <Grid container xs={12} sm={13}>
            <Grid item xs={6} md={3}>
            <TextField
                label="Year"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange = {(event) =>{
                    let Filter = examFilter
                    if(event.target.value){
                        Filter.year = parseInt(event.target.value)
                        setExamFilter(Filter)
                    }else{
                        delete Filter.year;
                        setExamFilter(Filter);
                    }
                    setQuery(false)
                    console.log(Filter)
                }}
            />
            </Grid>
                <Grid item xs={6} md={3}>
            <TextField
                label="Course Department"
                type="string"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange = {(event) =>{
                    let Filter = examFilter
                    if(event.target.value){
                        Filter.department = event.target.value
                        setExamFilter(Filter)
                    }else{
                        delete Filter.department;
                        setExamFilter(Filter);
                    }
                    setQuery(false)
                    console.log(Filter)
                }}
            />
            </Grid>
            <Grid item xs={6} md={3}>
            <TextField
                label="Course Name"
                type="string"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange = {(event) =>{
                    let Filter = examFilter
                    if(event.target.value){
                        Filter.courseName = event.target.value
                        setExamFilter(Filter)
                    }else{
                        delete Filter.courseName;
                        setExamFilter(Filter);
                    }
                    setQuery(false)
                    console.log(Filter)
                }}
            />
            </Grid>
            <Grid item xs={6} md={3}>
                <TextField
                    label="Instructor"
                    type="string"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange = {(event) =>{
                        let Filter = examFilter
                        if(event.target.value){
                            Filter.instructor = event.target.value
                            setExamFilter(Filter)
                        }else{
                            delete Filter.instructor;
                            setExamFilter(Filter);
                        }
                        setQuery(false)
                        console.log(Filter)
                    }}
                />
            </Grid>
            <Grid item xs={6} md={3}>
            <TextField
                label="Required/elective/liberal?"
                select
                InputLabelProps={{
                    shrink: true,
                }}
                SelectProps={{
                    native: true,
                }}
                onChange = {(event) =>{
                    let Filter = examFilter
                    if(event.target.value && event.target.value != "All"){
                        Filter.courseType = event.target.value
                        setExamFilter(Filter)
                    }else{
                        delete Filter.courseType;
                        setExamFilter(Filter);
                    }
                    setQuery(false)
                    console.log(Filter)
                }}
            >
                {Types.map((option) => (
                    <option value={option}>
                    {option}
                    </option>
                ))}
            </TextField>
            </Grid>
            <Grid item xs={6} md={3}>
            <TextField
                label="Semester"
                select
                InputLabelProps={{
                    shrink: true,
                }}
                SelectProps={{
                    native: true,
                }}
                
                onChange = {(event) =>{
                    let Filter = examFilter
                    if(event.target.value && event.target.value != "All"){
                        Filter.Semester = event.target.value
                        setExamFilter(Filter)
                    }else{
                        delete Filter.Semester;
                        setExamFilter(Filter);
                    }
                    setQuery(false)
                    console.log(Filter)
                }}
            >
                {Semester.map((option) => (
                    <option value={option}>
                    {option}
                    </option>
                ))}
            </TextField>
            </Grid>
            <Grid item xs={6} md={3}>
                <TextField
                    label="Exam Time"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange = {(event) =>{
                        let Filter = examFilter
                        if(event.target.value){
                            Filter.examTime = event.target.value
                            setExamFilter(Filter)
                        }else{
                            delete Filter.examTime;
                            setExamFilter(Filter);
                        }
                        setQuery(false)
                        console.log(Filter)
                    }}
                />
            </Grid>
            <Grid item xs={6} md={3}>
                <TextField
                    label="Exam Name"
                    type="string"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange = {(event) =>{
                        let Filter = examFilter
                        if(event.target.value){
                            Filter.examName = event.target.value
                            setExamFilter(Filter)
                        }else{
                            delete Filter.examName;
                            setExamFilter(Filter);
                        }
                        setQuery(false)
                        console.log(Filter)
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default ExamSelection;