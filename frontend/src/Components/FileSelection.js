import {
    TextField,
} from '@material-ui/core';

import {
    Grid,
} from '@mui/material';

const Semester = ["All", "Fall", "Spring", "Summer"];
const Types = ["All", "Required", "Elective", "Liberal"];

const FileSelection = ({fileFilter, setFileFilter, setQuery}) =>{
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
                    let Filter = fileFilter
                    if(event.target.value){
                        Filter.year = parseInt(event.target.value)
                        setFileFilter(Filter)
                    }else{
                        delete Filter.year;
                        setFileFilter(Filter);
                    }
                    setQuery(false);
                    console.log(Filter)
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
                    let Filter = fileFilter
                    if(event.target.value){
                        Filter.courseDept = event.target.value
                        setFileFilter(Filter)
                    }else{
                        delete Filter.courseDept;
                        setFileFilter(Filter);
                    }
                    setQuery(false);
                    console.log(Filter)
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
                    let Filter = fileFilter
                    if(event.target.value){
                        Filter.courseName = event.target.value
                        setFileFilter(Filter)
                    }else{
                        delete Filter.courseName;
                        setFileFilter(Filter);
                    }
                    setQuery(false);
                    console.log(Filter)
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
                        let Filter = fileFilter
                        if(event.target.value){
                            Filter.instructor = event.target.value
                            setFileFilter(Filter)
                        }else{
                            delete Filter.instructor;
                            setFileFilter(Filter);
                        }
                        setQuery(false);
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
                    let Filter = fileFilter
                    if(event.target.value && event.target.value !== "All"){
                        Filter.courseType = event.target.value
                        setFileFilter(Filter)
                    }else{
                        delete Filter.courseType;
                        setFileFilter(Filter);
                    }
                    setQuery(false);
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
                onChange = {(event) =>{
                    let Filter = fileFilter
                    if(event.target.value && event.target.value !== "All"){
                        Filter.Semester = event.target.value
                        setFileFilter(Filter)
                    }else{
                        delete Filter.Semester;
                        setFileFilter(Filter);
                    }
                    setQuery(false);
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
            <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
                <TextField
                    label="Exam Time"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    fullWidth
                    onChange = {(event) =>{
                        let Filter = fileFilter
                        if(event.target.value){
                            Filter.examTime = parseInt(event.target.value)
                            setFileFilter(Filter)
                        }else{
                            delete Filter.examTime;
                            setFileFilter(Filter);
                        }
                        setQuery(false);
                        console.log(Filter)
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
                        let Filter = fileFilter
                        if(event.target.value){
                            Filter.examName = event.target.value
                            setFileFilter(Filter)
                        }else{
                            delete Filter.examName;
                            setFileFilter(Filter);
                        }
                        setQuery(false);
                        console.log(Filter)
                    }}
                />
            </Grid>
        </Grid>
    )
}

export default FileSelection;