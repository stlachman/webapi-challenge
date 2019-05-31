const router = require("express").Router();

const Projects = require("../data/helpers/projectModel.js");
const Actions = require("../data/helpers/actionModel.js");

// POST  - CREATE new project
router.post("/", validateProject, (req, res) => {
  const projectInfo = req.body;
  Projects.insert(projectInfo)
    .then(project => {
      res.status(201).json({ project });
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating project" });
    });
});

// POST - CREATE new action
router.post("/:id/actions", validateProjectId, validateAction, (req, res) => {
  const actionInfo = req.body;
  actionInfo.project_id = req.project.id;

  Actions.insert(actionInfo)
    .then(action => {
      res.status(201).json({ action });
    })
    .catch(err => {
      res.status(500).json({ error: "Error creating new action for project." });
    });
});

// GET - READ all projects
router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json({ projects });
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving projects " });
    });
});

// GET - READ single project
router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

// PUT - UPDATE single project
router.put("/:id", validateProjectId, validateProject, (req, res) => {
  const updatedProject = req.body;
  Projects.update(req.project.id, updatedProject)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating project" });
    });
});

// DELETE - DELETE Single project
router.delete("/:id", validateProjectId, (req, res) => {
  Projects.remove(req.project.id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => res.status(500).json({ message: "Error deleting project" }));
});

// Middleware

function validateProjectId(req, res, next) {
  const projectId = req.params.id;
  Projects.get(projectId)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(400).json({ message: "Invalid project id" });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Error retrieving project" })
    );
}

function validateProject(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing project data" });
  } else if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "missing required description field" });
  } else {
    next();
  }
}

function validateAction(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing action data" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "missing required description field" });
  } else if (!req.body.notes) {
    res.status(400).json({ message: "missing required notes field" });
  } else {
    next();
  }
}

module.exports = router;
