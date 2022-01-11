import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import useSearchPage from '../Hooks/useSearchPage';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Box from '@material-ui/core/Box';
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
    Semester,
    Property,
    queryYear,
    queryType,
    queryProperty,
    querySemester,
    queryCourseDept,
    queryCourseName,
    queryAnswer,
    setQueryYear,
    setQueryProperty,
    setQuerySemester,
    setQueryCourseDept,
    setQueryCourseName,
    setQueryAnswer
  } = useSearchPage();
  const classes = useStyles();
  const {loading, data, subscribeToMore} = useQuery(USER_SEARCH_QUERY, {
      variables:{
          year_semester: [queryYear, querySemester].join("-"),
          courseDept: queryCourseDept,
          courseName: queryCourseName,
          type: queryType
      },
  })
  const handleQuery = () => {
    console.log(data);
  }
  const handleChange = (func) => (event) => {
    console.log(event.target.value)
    func(event.target.value);
  };

  return (
    <Wrapper>
    <StyledPaper elevation={3}>
    <InTextWrapper>
        <Box py = {3} px = {3}><Typography variant="h2" align = "center">
          Query Page
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
          <Grid item xs={6} md={2}>
            <TextField
              label="Semester"
              onChange = {handleChange(setQuerySemester)}
              select
              value={querySemester}
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
            onChange = {handleChange(setQueryProperty)}
            value={queryProperty}
            select
            InputLabelProps={{
              shrink: true,
            }}
            SelectProps={{
              native: true,
            }}
          >
            {Property.map((option) => (
                <option value={option}>
                {option}
                </option>
            ))}
          </TextField>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControlLabel 
              control={
                <Switch 
                onChange = {(e) => setQueryAnswer(e.target.checked)}/>
              } 
              label="Require Answer" 
              checked = {queryAnswer}/>
          </Grid>
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
      <ContentPaper variant="outlined">
      </ContentPaper>
    </InTextWrapper>
    </StyledPaper>
    </Wrapper>
  );
};

export default SearchPage;
