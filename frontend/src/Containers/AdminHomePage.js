import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
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

const theme = createTheme();

const AdminHomePage = () => {
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
              <LinkRouter to= "/adminReviewQueries">
                <Button variant="contained">See UnReviewed Queries</Button>
              </LinkRouter>
              <LinkRouter to= "/adminChangeVisibility">
                <Button variant="contained">delete/Change visibility of Courses, Exams and Files</Button>
              </LinkRouter>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  )
}

export default AdminHomePage;