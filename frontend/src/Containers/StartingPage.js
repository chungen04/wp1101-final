import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import FileUpload from "@mui/icons-material/FileUpload"
import Search from "@mui/icons-material/Search"
import Person from "@mui/icons-material/Person"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import {Link as LinkRouter} from 'react-router-dom';
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
              <LinkRouter to= "/contributePage">
              <Button variant="contained" startIcon = {<FileUpload />}>I'd like to contribute</Button>
              </LinkRouter>
              <LinkRouter to= "/searchPage">
              <Button variant="contained" startIcon = {<Search />}>I'd like to search for documents</Button>
              </LinkRouter>
              <LinkRouter to= "/adminSignIn">
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