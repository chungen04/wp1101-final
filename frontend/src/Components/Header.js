import{
    AppBar,
    Toolbar
} from '@mui/material'

import {
    Button,
    Typography,
    Box
} from '@material-ui/core';

import LogoutIcon from '@mui/icons-material/Logout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Header = ({navigate}) =>{
    return (
    <AppBar position="static">
        <Toolbar>
          <Box  noWrap sx={{ flexGrow: 1 }}>
            <label htmlFor="back-to-home">
              <Button 
                color="inherit"
                id="back-to-home"
                onClick = {() =>{
                  navigate("/adminHomePage")
                }}
                startIcon = {<ArrowBackIcon/>}
              >
                <Typography variant="h6" color="inherit" > 
                  back to admin home
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
    )
}

export default Header;