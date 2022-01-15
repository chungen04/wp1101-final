import {
    TextField,
} from '@material-ui/core';

import {
    Grid,
} from '@mui/material';
import useAdminChangeVisibility from '../Hooks/useAdminChangeVisibility';


const Semester = ["All", "Fall", "Spring", "Summer"];
const Types = ["All", "Required", "Elective", "Liberal"];

const ExamSelection = ({examFilter, setExamFilter, setQuery}) =>{
    return (
        <Grid container>
            <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <TextField
                label="Year"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                onChange = {(event) =>{
                    let Filter = examFilter
                    if(event.target.value){
                        Filter.year = parseInt(event.target.value)
                        setExamFilter(Filter)
                    }else{
                        delete Filter.year;
                        setExamFilter(Filter);
                    }
                }}
            />
            </Grid>
                <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <TextField
                label="Course Department"
                type="string"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                onChange = {(event) =>{
                    let Filter = examFilter
                    if(event.target.value){
                        Filter.courseDept = event.target.value
                        setExamFilter(Filter)
                    }else{
                        delete Filter.courseDept;
                        setExamFilter(Filter);
                    }
                }}
            />
            </Grid>
            <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <TextField
                label="Course Name"
                type="string"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                onChange = {(event) =>{
                    let Filter = examFilter
                    if(event.target.value){
                        Filter.courseName = event.target.value
                        setExamFilter(Filter)
                    }else{
                        delete Filter.courseName;
                        setExamFilter(Filter);
                    }
                }}
            />
            </Grid>
            <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
                <TextField
                    label="Instructor"
                    type="string"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    onChange = {(event) =>{
                        let Filter = examFilter
                        if(event.target.value){
                            Filter.instructor = event.target.value
                            setExamFilter(Filter)
                        }else{
                            delete Filter.instructor;
                            setExamFilter(Filter);
                        }
                        console.log(Filter)
                    }}
                />
            </Grid>
            <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <TextField
                label="Required/elective/liberal?"
                select
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                SelectProps={{
                    native: true,
                }}
                onChange = {(event) =>{
                    let Filter = examFilter
                    if(event.target.value && event.target.value !== "All"){
                        Filter.courseType = event.target.value
                        setExamFilter(Filter)
                    }else{
                        delete Filter.courseType;
                        setExamFilter(Filter);
                    }
                }}
            >
                {Types.map((option) => (
                    <option value={option}>
                    {option}
                    </option>
                ))}
            </TextField>
            </Grid>
            <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <TextField
                label="Semester"
                select
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                SelectProps={{
                    native: true,
                }}
                fullWidth
                onChange = {(event) =>{
                    let Filter = examFilter
                    if(event.target.value && event.target.value !== "All"){
                        Filter.Semester = event.target.value
                        setExamFilter(Filter)
                    }else{
                        delete Filter.Semester;
                        setExamFilter(Filter);
                    }
                }}
            >
                {Semester.map((option) => (
                    <option value={option}>
                    {option}
                    </option>
                ))}
            </TextField>
            </Grid>
            <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
                <TextField
                    label="Exam Time"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    onChange = {(event) =>{
                        let Filter = examFilter
                        if(event.target.value){
                            Filter.examTime = parseInt(event.target.value)
                            setExamFilter(Filter)
                        }else{
                            delete Filter.examTime;
                            setExamFilter(Filter);
                        }
                    }}
                />
            </Grid>
            <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
                <TextField
                    label="Exam Name"
                    type="string"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    onChange = {(event) =>{
                        let Filter = examFilter
                        if(event.target.value){
                            Filter.examName = event.target.value
                            setExamFilter(Filter)
                        }else{
                            delete Filter.examName;
                            setExamFilter(Filter);
                        }
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default ExamSelection;