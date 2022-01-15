import * as React from 'react';
import {useState} from "react"
import {Grid, Typography, TextField, Checkbox, Button}from '@mui/material';
import { InputLabel, NativeSelect} from "@material-ui/core";
import {useQuery} from "@apollo/react-hooks";
import { COURSES_QUERY } from '../graphql'; 
import SearchIcon from '@mui/icons-material/Search';

const Semester = ["", "Fall", "Spring", "Summer"];
const Property = ["", "Required", "Elective", "Liberal"];

export default function CourseForm({ updateCourse, course, addCourse, setAddCourse, showAlert, setAddExam }) {
  const variables = {}
  if (course.semester!=="") variables.semester = course.semester
  if (course.year!=="") variables.year = course.year*1
  if (course.type!=="") variables.courseType = course.type
  if (course.department!=="") variables.department = course.department
  const {data, loading, subscribeToMore} = useQuery(COURSES_QUERY, {
        variables
    });
  const [query, setQuery] = useState(false)
  const [selectData, setSelectData] = useState({})
  const [allCourseNameInstructors, setAllCourseNameInstructors] = useState([course.courseName + ' - ' + course.instructors])

  const handleCheckbox = () => {
    setAddExam(!addCourse)
    setAddCourse(!addCourse)
  }

  const handleQuery = async() => {
    if (course.year === "") {
      showAlert("warning", `Year is required.`)
      return
    } 
    if (course.semester === "") {
      showAlert("warning", `Semester is required.`)
      return
    } 
    if (course.type === "") {
      showAlert("warning", `Type is required.`)
      return
    } 
    if (course.department === "") {
      showAlert("warning", `Department is required.`)
      return
    }
    if (data.coursesForContribute.length === 0){
      showAlert("error", "courses not found! Please requery or add new course!")
      setQuery(false)
      return
    }
    const courseNamesInstructors = await data.coursesForContribute.map((courseObj)=>{
      return courseObj.courseName + " - " + courseObj.instructors
    })
    setQuery(true)
    setSelectData(data.coursesForContribute)
    setAllCourseNameInstructors(["", ...courseNamesInstructors])
  }

  const updateCourseBind = async(value) => {
    const [courseName, instructors] = value.split(" - ")
    let id = ""
    await Promise.all(
      selectData.map((data) => {
        if (data.courseName === courseName && data.instructors === instructors){
          id = data.id
        }
      })
    )
    updateCourse({id, courseName, instructors})
  }
  
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12} sm={9}>
          <Typography variant="h5" gutterBottom>
            Submission Details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Checkbox checked={addCourse} onChange={handleCheckbox} />
          <Typography variant="h7" gutterBottom>
            Add new course
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            onChange = {(e)=>updateCourse({"year": e.target.value})}
            value={course.year}
            id="year"
            type = "number"
            name="year"
            label="Year"
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm = {6}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Semester
          </InputLabel>
          <NativeSelect
            defaultValue={course.semester}
            required
            onChange={(e)=>updateCourse({"semester": e.target.value})}
            fullWidth
          >
            {Semester.map((option) => (
                <option value={option}>
                {option}
                </option>
            ))}
          </NativeSelect>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Course Type (Required/Elective/Liberal)
          </InputLabel>
          <NativeSelect
            defaultValue={course.type}
            inputProps={{
              required: true
            }}
            onChange={(e)=>updateCourse({"type": e.target.value})}
            fullWidth
          >
            {Property.map((option) => (
                <option value={option}>
                {option}
                </option>
            ))}
          </NativeSelect>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required={addCourse}
            id="courseDept"
            value={course.department}
            onChange = {(e)=>updateCourse({"department": e.target.value})}
            name="courseDept"
            label="Course Department"
            fullWidth
            variant="standard"
          />
        </Grid>
        {
          addCourse ? 
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="course"
                name="course"
                value={course.courseName}
                onChange = {(e)=>updateCourse({"courseName": e.target.value})}
                label="Course Name"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="Instructor"
                value={course.instructors}
                onChange={(e)=>updateCourse({"instructors": e.target.value})}
                name="Instructor"
                label="Instructor"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
              />
            </Grid>
          </> :
          <>
            <Grid item xs={12} sm={12} textAlign="center" >
              <Button variant="contained" onClick={handleQuery} startIcon = {<SearchIcon/>}>Find a Course</Button>
            </Grid>
            {
              !query ? 
              <Grid item xs={12} sm={12}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Course Name - Instructors
                </InputLabel>
                <NativeSelect
                  required
                  
                  inputProps={{
                    defaultValue: course.courseName + " - " + course.instructors,
                    required: true,
                    contentEditable: false,
                  }}
                  fullWidth
                >
                  {allCourseNameInstructors.map((option) => (
                      <option value={option}>
                      {option}
                      </option>
                  ))}
                </NativeSelect>
              </Grid> :
              <Grid item xs={12} sm={12}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Course Name - Instructors
                </InputLabel>
                <NativeSelect
                  required
                  defaultValue={course.courseName + " - " + course.instructors}
                  value={course.courseName + " - " + course.instructors}
                  inputProps={{
                    required: true,
                    disabled: false
                  }}
                  onChange={(e)=>updateCourseBind(e.target.value)}
                  fullWidth
                >
                  {allCourseNameInstructors.map((option) => (
                      <option value={option}>
                      {option}
                      </option>
                  ))}
                </NativeSelect>
              </Grid>
            }
          </>
        }
        <Grid item xs={12}>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}