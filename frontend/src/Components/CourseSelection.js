import {
    TextField,
} from '@material-ui/core';

import {
    Grid,
} from '@mui/material';


const Semester = ["All", "Fall", "Spring", "Summer"];
const Types = ["All", "Required", "Elective", "Liberal"];

const CourseSelection = ({courseFilter, setCourseFilter}) =>{

    return (
        <Grid container>
            <Grid item xs={12} sm = {3} sx={{ p: 1 }}>
            <TextField
                label="Year"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                onChange = {(event) =>{
                    let Filter = courseFilter
                    if(event.target.value){
                        Filter.year = parseInt(event.target.value)
                        setCourseFilter(Filter)
                    }else{
                        delete Filter.year;
                        setCourseFilter(Filter);
                    }
                }}
            />
            </Grid>
            <Grid item xs={12} sm = {3} sx={{ p: 1 }}>
            <TextField
                label="Semester"
                select
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                SelectProps={{
                    native: true,
                }}
                onChange = {(event) =>{
                    let Filter = courseFilter
                    if(event.target.value && event.target.value !== "All"){
                        Filter.Semester = event.target.value
                        setCourseFilter(Filter)
                    }else{
                        delete Filter.Semester;
                        setCourseFilter(Filter);
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
            <Grid item xs={12} sm = {3} sx={{ p: 1 }}>
            <TextField
                label="Course Department"
                type="string"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                onChange = {(event) =>{
                    let Filter = courseFilter
                    if(event.target.value){
                        Filter.courseDept = event.target.value
                        setCourseFilter(Filter)
                    }else{
                        delete Filter.courseDept;
                        setCourseFilter(Filter);
                    }
                }}
            />
            </Grid>
            <Grid item xs={12} sm = {3} sx={{ p: 1 }}>
            <TextField
                label="Required/elective/liberal?"
                select
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
                SelectProps={{
                    native: true,
                }}
                onChange = {(event) =>{
                    let Filter = courseFilter
                    if(event.target.value && event.target.value !== "All"){
                        Filter.courseType = event.target.value
                        setCourseFilter(Filter)
                    }else{
                        delete Filter.courseType;
                        setCourseFilter(Filter);
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
            <Grid item xs={12} sm = {3} sx={{ p: 1 }}>
            <TextField
                label="Course Name"
                type="string"
                InputLabelProps={{
                    shrink: true,
                }}
                fullWidth
                onChange = {(event) =>{
                    let Filter = courseFilter
                    if(event.target.value){
                        Filter.courseName = event.target.value
                        setCourseFilter(Filter)
                    }else{
                        delete Filter.courseName;
                        setCourseFilter(Filter);
                    }
                }}
            />
            </Grid>
        </Grid>
    )
}

export default CourseSelection;