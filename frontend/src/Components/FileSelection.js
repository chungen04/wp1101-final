import {
    TextField,
} from '@material-ui/core';

import {
    Grid,
} from '@mui/material';
import useAdminChangeVisibility from '../Hooks/useAdminChangeVisibility';

const FileSelection = ({fileFilter, setFileFilter}) =>{
    const {
        Semester,
        Types
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
                    let Filter = fileFilter
                    if(event.target.value){
                        Filter.year = parseInt(event.target.value)
                        setFileFilter(Filter)
                    }else{
                        delete Filter.year;
                        setFileFilter(Filter);
                    }
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
                    let Filter = fileFilter
                    if(event.target.value){
                        Filter.courseDept = event.target.value
                        setFileFilter(Filter)
                    }else{
                        delete Filter.courseDept;
                        setFileFilter(Filter);
                    }
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
                    let Filter = fileFilter
                    if(event.target.value){
                        Filter.courseName = event.target.value
                        setFileFilter(Filter)
                    }else{
                        delete Filter.courseName;
                        setFileFilter(Filter);
                    }
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
                        let Filter = fileFilter
                        if(event.target.value){
                            Filter.instructor = event.target.value
                            setFileFilter(Filter)
                        }else{
                            delete Filter.instructor;
                            setFileFilter(Filter);
                        }
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
                    let Filter = fileFilter
                    if(event.target.value && event.target.value != "All"){
                        Filter.courseType = event.target.value
                        setFileFilter(Filter)
                    }else{
                        delete Filter.courseType;
                        setFileFilter(Filter);
                    }
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
                    let Filter = fileFilter
                    if(event.target.value && event.target.value != "All"){
                        Filter.Semester = event.target.value
                        setFileFilter(Filter)
                    }else{
                        delete Filter.Semester;
                        setFileFilter(Filter);
                    }
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
                        let Filter = fileFilter
                        if(event.target.value){
                            Filter.examTime = parseInt(event.target.value)
                            setFileFilter(Filter)
                        }else{
                            delete Filter.examTime;
                            setFileFilter(Filter);
                        }
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
                        let Filter = fileFilter
                        if(event.target.value){
                            Filter.examName = event.target.value
                            setFileFilter(Filter)
                        }else{
                            delete Filter.examName;
                            setFileFilter(Filter);
                        }
                        console.log(Filter)
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default FileSelection;