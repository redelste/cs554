const express = require("express");
const router = express.Router();
const data = require("../data");
const taskData = data.tasks;

router.get("/:id", async (req, res) => {
  try {
    const task = await taskData.getTaskById(req.params.id);
    res.json(task);
  } catch (e) {
    console.log(e)
    res.status(404).json({ message: "not found!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const taskList = await taskData.getAllTasks();
    console.log(req.body);
    res.json(taskList);
  } catch (e) {
    // Something went wrong with the server!
    res.status(500).send();
  }
});

router.post("/", async (req, res) => {
  console.log(req.body)
  const taskInfo = req.body;
  if (!taskInfo) {
    res.status(400).json({ error: "You must provide data to create a task" });
    return;
  }

  if (!taskInfo.title) {
    res.status(400).json({ error: "You must provide a title" });
    return;
  }

  if (!taskInfo.description) {
    res.status(400).json({ error: "You must provide a description" });
    return;
  }
  if (!taskInfo.hoursEstimated) {
    res.status(400).json({ error: "You must provide a number of hours Estimated" });
    return;
  }
  if (!taskInfo.completed) {
    res.status(400).json({ error: "You must provide a yes or no value" });
    return;
  }

  try {
    const newTask = await taskData.addTask(
      taskInfo.title,
      taskInfo.description,
      taskInfo.hoursEstimated,
      taskInfo.completed
      // taskInfo.comments
    );
    res.json(newTask);
  } catch (e) {
    res.sendStatus(500).json({error: "You messed up somewhere"});
  }
});

router.put("/:id", async (req, res) => {
  // console.log("TESTING");
  const taskInfo = req.body;
  if (!taskInfo) {
    res.status(400).json({ error: "You must provide data to update a task" });
    return;
  }
  if (!taskInfo.title) {
    res.status(400).json({ error: "You must provide a first name" });
    return;
  }

  if (!taskInfo.description) {
    res.status(400).json({ error: "You must provide a description" });
    return;
  }
  if (!taskInfo.hoursEstimated) {
    res.status(400).json({ error: "You must provide hours Estimated" });
    return;
  }
  if (!taskInfo.completed) {
    res.status(400).json({ error: "You must provide whether or not it has been completed" });
    return;
  }
  try {
    await taskData.getTaskById(req.params.id);
    const updatedTask = await taskData.updateTask(req.params.id, taskInfo);
    res.status(200).json(updatedTask);
  } catch (e) {
    res.status(500).json({error:e});
  }
});


router.patch("/:id", async (req, res)=>{
  // console.log("DO PLEASE");
  try{
    let patchTask = await taskData.taskPatch(req.params.id, req.body);
    res.json(patchTask);
  } catch(err){
    res.status(500).json({error:err})
  }
});

router.post("/:id/comments", async(req, res)=>{
  // console.log(req);
  const { id } = req.params
  try{
    const { name, comment } = req.body;
    // console.log("name: ", name)
    // console.log("id", id)
    // console.log("comment", comment)
    const added = await taskData.addComment(id, name, comment)
    res.status(200).json(added)
  } catch(e){
    // console.log(e)
    res.status(500).json({error:e});
  }
})

router.delete("/:taskId/:commentId", async(req,res)=>{
  const { id, comment } = req.params
  try {
    
  } catch (e) {
    res.status(500).json({error:e});
  }
})


// router.delete("/:id", async (req, res) => {
//   try {
//     await taskData.getTaskById(req.params.id);
//   } catch (e) {
//     res.status(404).json({ error: "User not found" });
//     return;
//   }
//
//   try {
//     await taskData.removeTask(req.params.id);
//     res.sendStatus(200);
//   } catch (e) {
//     res.sendStatus(500);
//     return;
//   }
// });

module.exports = router;
