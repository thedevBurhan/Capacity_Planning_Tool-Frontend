import "./App.css";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { Route } from "react-router-dom/cjs/react-router-dom";
import Login from "./Components/Login/login";
import SignIn from "./Components/Login/signIn";
import Gif from "./Components/DashBoard/gif.js";
import Personal from "./Components/Personal/Personal.js";
import TimeSheet from "./Components/TimeSheet/timeSheet.js";
import Work from "./Components/Work/work.js";
import Meeting from "./Components/Meeting/meeting.js";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth < 1400) {
        alert("Screen size is less than 1400px!");
      }
    }

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Call the function once on component mount to check initial screen size
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/DashBoard">
          <Gif />
        </Route>
        <Route path="/Personal">
          <Personal />
        </Route>
        <Route path="/TimeSheet">
          <TimeSheet />
        </Route>
        <Route path="/Work">
          <Work />
        </Route>
        <Route path="/Meeting">
          <Meeting />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
