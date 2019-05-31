const router = require("express").Router();

const Projects = require("../data/helpers/projectModel.js");

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

module.exports = router;
