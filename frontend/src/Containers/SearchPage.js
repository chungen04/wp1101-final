import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Box
} from '@material-ui/core';

import {
  Grid,
  FormControlLabel,
  Switch
} from '@mui/material';

import styled from 'styled-components';
import useSearchPage from '../Hooks/useSearchPage';
import React from "react";

import { USER_SEARCH_QUERY } from "../graphql/query";
import { useQuery } from '@apollo/client';

const Wrapper = styled.div`
  margin: auto;
  width: 60%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const useStyles = makeStyles({
  input: {
    margin: '0 0.2em',
  },
  button: {
    width: '100px',
    marginLeft: '0.6em',
  },
});

const InTextWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const StyledPaper = styled(Paper)`
  padding: 2em;
`;



const SearchPage = () => {
  const {
    Card,
    Semester,
    Types,
    queryFiles,
    queryYear,
    queryType,
    querySemester,
    queryCourseDept,
    queryCourseName,
    queryAnswer,
    setFiles,
    setQueryYear,
    setQuerySemester,
    setQueryCourseDept,
    setQueryCourseName,
    setQueryAnswer,
    setQueryType
  } = useSearchPage();


  const classes = useStyles();
  const variables = {}
  if(queryCourseDept !== "") variables.courseDept = queryCourseDept;
  if(queryCourseName !== "") variables.courseName = queryCourseName;
  if(queryType !== "All" && queryType) variables.type = queryType;
  if(queryYear !== NaN && queryYear !== "" && queryYear) variables.year = parseInt(queryYear);
  if(querySemester !== "All") variables.semester = querySemester
  console.log(variables);

  const {loading, data, subscribeToMore} = useQuery(USER_SEARCH_QUERY, {
      variables: variables
  })

  let Files = []
  const handleQuery = () => {
    Files = []
    data.courses.map(e =>{
      e.exams.map(f =>{
        f.files.map(g =>{
          Files.push({
            ...e,
            ...f,
            ...g
          })
        })
      })
    })
    Files.forEach(element => {
      delete element['exams'];
      delete element['files'];
      delete element['__typename'];
    });
    console.log(Files)
    setFiles(Files);
  }

  const handleChange = (func) => (event) => {
    console.log(event.target.value)
    func(event.target.value);
  };

  return (
    <Wrapper>
    <StyledPaper elevation={3}>
    <InTextWrapper>
        <Box py = {3} px = {3}><Typography variant="h4" align = "center">
          Search for the Documents Uploaded<br></br>
           in NTU Old Exams.
        </Typography></Box>
        
        <StyledFormControl>
        <Grid container xs={12} sm={13}>
        <Grid item xs={6} md={3}>
          <TextField
            label="Year"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value = {queryYear}
            onChange = {handleChange(setQueryYear)}
          />
          </Grid>
            <Grid item xs={6} md={3}>
          <TextField
            label="Course Department"
            type="string"
            value = {queryCourseDept}
            InputLabelProps={{
              shrink: true,
            }}
            onChange = {handleChange(setQueryCourseDept)}
          />
          </Grid>
          <Grid item xs={6} md={3}>
          <TextField
            label="Course Name"
            type="string"
            value = {queryCourseName}
            InputLabelProps={{
              shrink: true,
            }}
            onChange = {handleChange(setQueryCourseName)}
          />
          </Grid>
          
          <Grid item xs={6} md={3}>
          <TextField
            label="Required/elective/liberal?"
            onChange = {handleChange(setQueryType)}
            value={queryType}
            select
            InputLabelProps={{
              shrink: true,
            }}
            SelectProps={{
              native: true,
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
            onChange = {handleChange(setQuerySemester)}
            value={querySemester}
            select
            InputLabelProps={{
              shrink: true,
            }}
            SelectProps={{
              native: true,
            }}
          >
            {Semester.map((option) => (
                <option value={option}>
                {option}
                </option>
            ))}
          </TextField>
          </Grid>
          {/*<Grid item xs={6} md={3}>
            <FormControlLabel 
              control={
                <Switch 
                onChange = {(e) => setQueryAnswer(e.target.checked)}/>
              } 
              label="Require Answer" 
              checked = {queryAnswer}/>
          </Grid>*/}
          </Grid>
        </StyledFormControl>
        <br></br>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick = {handleQuery}
        >
          Query
        </Button>
        <br></br>
      <ContentPaper variant="outlined" >
      {
        queryFiles.map((e) =>
          <Card content = {e}/>
        )
      }
      </ContentPaper>
    </InTextWrapper>
    </StyledPaper>
    </Wrapper>
  );
};

export default SearchPage;
