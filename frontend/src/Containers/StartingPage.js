import * as React from 'react';

import {
  AppBar, 
  Button,
  CssBaseline,
  Stack,
  Box,
  Typography,
  Toolbar,
  Container,
  Link
}from '@mui/material';

import {
  FileUpload, 
  Search,
  Person
} from "@mui/icons-material"

import { Link as LinkRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const StartingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            NTU Old Exams
          </Typography>
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
              Find All NTU Old Exams Here.
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              You may find any old exam problems and answers
              or make contributions to the exam problems you've just got
              anywhere, anytime.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <LinkRouter to= "/contributePage" style={{ textDecoration: 'none' }}>
              <Button variant="contained" startIcon = {<FileUpload />}>I'd like to contribute</Button>
              </LinkRouter>
              <LinkRouter to= "/searchPage"  style={{ textDecoration: 'none' }}>
              <Button variant="contained" startIcon = {<Search />}>I'd like to search for documents</Button>
              </LinkRouter>
              <LinkRouter to= "/adminSignIn"  style={{ textDecoration: 'none' }}>
                <Button variant="outlined" startIcon = {<Person />}>Admin Sign In</Button>
              </LinkRouter>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}
/*<LinkRouter to= "/studentHomePage"></LinkRouter>*/
export default StartingPage;