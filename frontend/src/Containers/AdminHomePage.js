import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as LinkRouter, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LogoutIcon from '@mui/icons-material/Logout';

const theme = createTheme();

const AdminHomePage = () => {
  const navigate = useNavigate();
  React.useEffect(() =>{
    if(!localStorage.getItem("token")){
      navigate("/adminSignIn")
    }
  })
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Box  noWrap sx={{ flexGrow: 1 }}>
            <label htmlFor="back-to-home">
              <Button 
                color="inherit"
                id="back-to-home"
                onClick = {() =>{
                  navigate("/")
                }}
              >
                <Typography variant="h6" color="inherit" > 
                  NTU Old Exams
                </Typography>
              </Button>
            </label>
          </Box>
          <Button 
            color = "inherit"
            onClick = {() =>{
              localStorage.removeItem("token")
              navigate("/")
            }}
            endIcon = {<LogoutIcon />}
          >
            <Typography variant="h6" color="inherit" > 
              Logout
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Welcome, Admin
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Check the Unreviewed Query and Delete/Change Visibilty of <br></br>
              Courses, Exams, and Files. 
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="column"
              spacing={2}
              justifyContent="center"
              align = "center"
            >
              <LinkRouter to= "/adminReviewQueries"  style={{ textDecoration: 'none' }}>
                <Button variant="contained" startIcon = {<CheckIcon />}>See UnReviewed Queries</Button>
              </LinkRouter>
              <LinkRouter to= "/adminChangeCourseVisibility"  style={{ textDecoration: 'none' }}>
                <Button variant="contained" startIcon = {<SchoolIcon />}>delete/Change visibility of Courses</Button>
              </LinkRouter>
              <LinkRouter to= "/adminChangeExamVisibility"  style={{ textDecoration: 'none' }}>
                <Button variant="contained" startIcon = {<QuizIcon />}>delete/Change visibility of Exams</Button>
              </LinkRouter>
              <LinkRouter to= "/adminChangeFileVisibility"  style={{ textDecoration: 'none' }}>
                <Button variant="contained" startIcon = {<InsertDriveFileIcon />}>delete/Change visibility of Files</Button>
              </LinkRouter>
              <br></br>
            </Stack>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
            
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

export default AdminHomePage;