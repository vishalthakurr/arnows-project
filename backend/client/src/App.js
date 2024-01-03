import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";

import PrivateRoute from "./utils/PrivateRoute";
import blog from "./components/About/blog";

function App() {
  return (
    <>
      <Router>
        <div className="container BgColor">
          <NoteState>
            <Switch>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <PrivateRoute path="/about" component={blog} />
              <Redirect from="/" to="login" />
            </Switch>
          </NoteState>
        </div>
      </Router>
    </>
  );
}

export default App;
