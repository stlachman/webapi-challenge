import React from "react";
import axios from "axios";

class Project extends React.Component {
  constructor() {
    super();

    this.state = {
      project: "",
      fetchingProject: true,
      error: ""
    };
  }

  componentDidMount() {
    const projectId = this.props.match.params.id;
    return axios
      .get(`http://localhost:4000/api/projects/${projectId}`)
      .then(res => this.setState({ project: res.data, fetchingProject: false }))
      .catch(err =>
        this.setState({ error: err.message, fetchingProject: false })
      );
  }

  render() {
    if (this.state.fetchingProject) {
      return (
        <div>
          <h2>Fetching Project Info</h2>
        </div>
      );
    }
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}

        {this.state.project && (
          <div>
            <h2>Project Name: {this.state.project.name}</h2>
            <p>Project Description: {this.state.project.description}</p>
            <div>
              {this.state.project.actions.map(action => (
                <div key={action.id}>
                  <p>Description: {action.description}</p>
                  <p>Notes: {action.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Project;
