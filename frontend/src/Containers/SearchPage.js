import {
  Button,
  FormControl,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Box,
  Divider
} from '@material-ui/core';

import {
  Grid,
  Switch
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import styled from 'styled-components';
import useSearchPage from '../Hooks/useSearchPage';
import React from "react";

import { USER_SEARCH_QUERY } from "../graphql/query";
import { useQuery } from '@apollo/client';

const Wrapper = styled.div`
  margin: 2vh auto;
  width: 60%;
  height: 96vh;
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
  max-height: 90vh;
  overflow: auto;
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
  if(querySemester !== "All"&& querySemester) variables.semester = querySemester
  console.log(variables);

  const {loading, data, subscribeToMore} = useQuery(USER_SEARCH_QUERY, {
      variables: variables
  })

  let Files = []
  const handleQuery = () => {
    Files = []
    data.courses.map(e =>{
      console.log(e)
      if(e.show){
        e.exams.map(f =>{
          if(f.show){
            f.files.map(g =>{
              if(g.show && g.pass){
                if(!queryAnswer || (queryAnswer && g.answerDownloadLink)){
                  Files.push({
                    ...e,
                    ...f,
                    ...g
                  })
                }
              }
            })
          }
        })
      }
    })
    Files.forEach(element => {
      delete element['exams'];
      delete element['files'];
      delete element['__typename'];
      delete element['pass'];
      delete element['show'];
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
        <Box py = {3} px = {3}>
        <Typography variant="h4" align = "center">
          Search for the Documents Uploaded<br></br>
           in NTU Old Exams.
        </Typography><br></br>
        <Typography variant="body1" align = "center">
         Fill in the field(s) to search what you want!
        </Typography><br></br>
        </Box>
        
        <StyledFormControl>
        <Grid container >
          <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <TextField
              label="Year"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              value = {queryYear}
              fullWidth
              onChange = {handleChange(setQueryYear)}
            />
          </Grid>
          <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <TextField
              label="Course Department"
              type="string"
              value = {queryCourseDept}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange = {handleChange(setQueryCourseDept)}
            />
          </Grid>
          <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <TextField
              label="Course Name"
              type="string"
              value = {queryCourseName}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              onChange = {handleChange(setQueryCourseName)}
            />
          </Grid>
          <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <TextField
              label="Required/elective/liberal?"
              onChange = {handleChange(setQueryType)}
              value={queryType}
              select
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
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
          <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <TextField
              label="Semester"
              onChange = {handleChange(setQuerySemester)}
              value={querySemester}
              select
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
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
          <Grid item xs={12} sm = {6} sx={{ p: 1 }}>
            <Typography variant = "body2">
              Require Answer?
            </Typography>
            <Switch onChange = { (e) =>{
              setQueryAnswer(e.target.checked)
            }}/>
          </Grid>
        </Grid>
        </StyledFormControl>
        <br></br>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick = {handleQuery}
          startIcon = {<SearchIcon/>}
        >
          Query
        </Button>
        <br></br>
      <ContentPaper variant="outlined" >
      {
        queryFiles.length !== 0? (
          queryFiles.map((e, i) =>{
            return (i !== queryFiles.length-1) ? 
            <>
              <Card content = {e}/>
              <Divider />
            </> :
            <>
              <Card content = {e}/>
            </>
          }
          )
        ):(
          <Typography variant = "body2">No Documents Found...</Typography>
        )
      }
      </ContentPaper>
    </InTextWrapper>
    </StyledPaper>
    </Wrapper>
  );
};

export default SearchPage;
