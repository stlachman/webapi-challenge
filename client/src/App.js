import React from "react";
import { Route } from "react-router-dom";

import ProjectList from "./components/ProjectList";
import Project from "./components/Project";

function App() {
  return (
    <>
      <Route exact path="/" component={ProjectList} />
      <Route exact path="/projects/:id" component={Project} />
    </>
  );
}

export default App;
