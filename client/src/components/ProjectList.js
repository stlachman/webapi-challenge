import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class ProjectList extends React.Component {
  constructor() {
    super();

    this.state = {
      projects: [],
      fetchingProjects: true,
      error: ""
    };
  }

  componentDidMount() {
    return axios
      .get("http://localhost:4000/api/projects/")
      .then(res =>
        this.setState({ fetchingProjects: false, projects: res.data.projects })
      )
      .catch(err => this.setState({ fetchingProjects: false, error: err }));
  }

  render() {
    if (this.state.fetchingProjects) {
      return (
        <div>
          <h2>Fetching Projects</h2>
        </div>
      );
    }
    return (
      <div>
        <h2>Current Projects</h2>
        {this.state.error && <p>{this.state.error}</p>}
        {this.state.projects &&
          this.state.projects.map(project => {
            return (
              <div key={project.id}>
                <p>{project.name}</p>
                <Link to={`/projects/${project.id}`}>View Project</Link>
              </div>
            );
          })}
      </div>
    );
  }
}

export default ProjectList;
