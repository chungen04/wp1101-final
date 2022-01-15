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
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}> 
            NTU Old Exams
          </Typography>
          <Button 
            color = "inherit"
            onClick = {() =>{
              localStorage.removeItem("token")
              navigate("/adminSignIn")
            }}
          >Logout</Button>
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
              Check the unreviewed query and delete/change visibilty of <br></br>
              Courses, Exams, and Files. 
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <LinkRouter to= "/adminReviewQueries"  style={{ textDecoration: 'none' }}>
                <Button variant="contained">See UnReviewed Queries</Button>
              </LinkRouter>
              <LinkRouter to= "/adminChangeCourseVisibility"  style={{ textDecoration: 'none' }}>
                <Button variant="contained">delete/Change visibility of Courses</Button>
              </LinkRouter>
              <LinkRouter to= "/adminChangeExamVisibility"  style={{ textDecoration: 'none' }}>
                <Button variant="contained">delete/Change visibility of Exams</Button>
              </LinkRouter>
              <LinkRouter to= "/adminChangeFileVisibility"  style={{ textDecoration: 'none' }}>
                <Button variant="contained">delete/Change visibility of Files</Button>
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