import React from "react";
import { Route } from "react-router-dom";

import ProjectList from "./components/ProjectList";
import Project from "./components/Project";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <Route exact path="/" component={ProjectList} />
      <Route exact path="/projects/:id" component={Project} />
    </>
  );
}

export default App;
