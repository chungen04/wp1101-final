import {
    TextField,
} from '@material-ui/core';

import {
    Grid,
} from '@mui/material';
import useAdminChangeVisibility from '../Hooks/useAdminChangeVisibility';

const CourseSelection = ({courseFilter, setCourseFilter, setQuery}) =>{
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
                    let Filter = courseFilter
                    if(event.target.value){
                        Filter.year = parseInt(event.target.value)
                        setCourseFilter(Filter)
                    }else{
                        delete Filter.year;
                        setCourseFilter(Filter);
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
                    let Filter = courseFilter
                    if(event.target.value){
                        Filter.courseDept = event.target.value
                        setCourseFilter(Filter)
                    }else{
                        delete Filter.courseDept;
                        setCourseFilter(Filter);
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
                    let Filter = courseFilter
                    if(event.target.value){
                        Filter.courseName = event.target.value
                        setCourseFilter(Filter)
                    }else{
                        delete Filter.courseName;
                        setCourseFilter(Filter);
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
                    let Filter = courseFilter
                    if(event.target.value && event.target.value !== "All"){
                        Filter.courseType = event.target.value
                        setCourseFilter(Filter)
                    }else{
                        delete Filter.courseType;
                        setCourseFilter(Filter);
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
                    let Filter = courseFilter
                    if(event.target.value && event.target.value !== "All"){
                        Filter.Semester = event.target.value
                        setCourseFilter(Filter)
                    }else{
                        delete Filter.Semester;
                        setCourseFilter(Filter);
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
        </Grid>
    )
}

export default CourseSelection;