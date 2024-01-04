import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";

import PrivateRoute from "./utils/PrivateRoute";
import Blog from "./components/dashboard/blog";
import ArticleDetail from "./components/dashboard/ArticleDetail";
import Addblog from "./components/dashboard/Addblog";

function App() {
  return (
    <Router>
      <div className="BgColor">
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <PrivateRoute path="/dashboard" component={Blog} />
          <PrivateRoute path="/createBlog" component={Addblog} />
          <PrivateRoute path="/article/:id" component={ArticleDetail} />
          <Redirect from="/" to="login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
