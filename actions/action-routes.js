const router = require("express").Router();

const Actions = require("../data/helpers/actionModel.js");
const Project = require("../data/helpers/projectModel.js");

// POST - CREATE action
router.post("/", validateAction, (req, res) => {
  const actionInfo = req.body;
  Actions.insert(actionInfo)
    .then(action => {
      res.status(201).json({ action });
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating action" });
    });
});

// GET - READ all actions
router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json({ actions });
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving actions " });
    });
});

// GET - READ single action
router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

// PUT - UPDATE single action
router.put("/:id", validateActionId, validateAction, (req, res) => {
  const updatedAction = req.body;
  Actions.update(req.action.id, updatedAction)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating action" });
    });
});

// DELETE - DELETE a single action

router.delete("/:id", validateActionId, (req, res) => {
  Actions.remove(req.action.id)
    .then(action => res.status(200).json(action))
    .catch(err => res.status(500).json({ message: "Error removing action" }));
});

function validateActionId(req, res, next) {
  const actionId = req.params.id;
  Actions.get(actionId)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(400).json({ message: "Invalid action id" });
      }
    })
    .catch(err => res.status(500).json({ message: "Error retrieving action" }));
}

function validateAction(req, res, next) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing action data" });
  } else if (!req.body.description) {
    res.status(400).json({ message: "missing required description field" });
  } else if (!req.body.notes) {
    res.status(400).json({ message: "missing required notes field" });
  } else if (!req.body.project_id) {
    res.status(400).json({ message: "missing required project_id field" });
  } else {
    next();
  }
}

module.exports = router;
