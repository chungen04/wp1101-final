import logo from './logo.svg';
import './App.css';
import StartingPage from "./Containers/StartingPage"
import SignIn from './Containers/SignIn';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AdminHomePage from './Containers/AdminHomePage';
import ContributePage from './Containers/ContributePage';
import SearchPage from './Containers/SearchPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" exact element = {<StartingPage/>}/>
        <Route path = "/adminSignIn" exact element = {<SignIn/>}/>
        <Route path = "/adminHomePage" exact element = {<AdminHomePage/>}/>
        <Route path = "/searchPage" exact element = {<SearchPage/>}/>
        <Route path = "/contributePage" exact element = {<ContributePage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
