import './App.css';
import StartingPage from "./Containers/StartingPage"
import SignIn from './Containers/SignIn';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AdminHomePage from './Containers/AdminHomePage';
import AdminReviewQueries from './Containers/AdminReviewQueries';
import AdminChangeVisibility from './Containers/AdminChangeVisibility';
import ContributePage from './Containers/ContributePage';
import SearchPage from './Containers/SearchPage';



function App() {
  return (
      <Router>
        <Routes>
          <Route path = "/" exact element = {<StartingPage/>}/>
          <Route path = "/adminSignIn" exact element = {<SignIn/>}/>
          <Route path = "/adminHomePage" exact element = {<AdminHomePage/>}/>
          <Route path = "/adminReviewQueries" exact element = {<AdminReviewQueries/>}/>
          <Route path = "/adminChangeVisibility" exact element = {<AdminChangeVisibility/>}/>
          <Route path = "/searchPage" exact element = {<SearchPage/>}/>
          <Route path = "/contributePage" exact element = {<ContributePage/>}/>
        </Routes>
      </Router>
  );
}

export default App;
