const mongoCollections = require("../config/mongoCollections");
const tasks = mongoCollections.tasks;
const uuid = require("node-uuid");

// NOT FINISHED USE QUERY STUFF


let exportedMethods = {
  getAllTasks(skipCount, takeCount) {
    return tasks().then(taskCollection => {
      return taskCollection.find().limit(takeCount).skip(skipCount).toArray();
    })
  },
  getTaskById(id) {
    // console.log(id)
    return tasks().then(taskCollection => {
      return taskCollection.findOne({ _id: id }).then(task => {
        if (!task) throw "Task not found";
        return task;
      });
    });
  },
  addTask(title, description,hoursEstimated, completed, comments) {
    if(typeof title !== 'string' || title == "") throw "The title must be a string"
    if(typeof description !== 'string' || description == "") throw "You must include a description"
    if(typeof hoursEstimated !== 'number' || hoursEstimated < 0) throw "You must enter the number of hours estimated"
    if(typeof completed !== 'boolean') throw "You must enter a bool val"
    // if(!comments instanceof Array) throw "The comments must be an array"
    try{
      return tasks().then(taskCollection => {
        let newTask = {
          title: title,
          description: description,
          hoursEstimated: hoursEstimated,
          completed: completed, //Boolean value
          comments: [],
          _id: uuid.v4()
        };
        return taskCollection
          .insertOne(newTask)
          .then(newInsertInformation => {
            return newInsertInformation.insertedId;
          })
          .then(newId => {
            return this.getTaskById(newId);
          });
        });
      } catch(e){}
  },
  removeTask(id) {
    return Tasks().then(TaskCollection => {
      return taskCollection.removeOne({ _id: id }).then(deletionInfo => {
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete Task with id of ${id}`;
        }
      });
    });
  },
  updateTask(id, updatedTask) {
    const {title, description, hoursEstimated, completed, comments} = updatedTask;
    if(typeof title !== 'string' || title == "") throw "The title must be a string"
    if(typeof description !== 'string' || description == "") throw "You must include a description"
    if(typeof hoursEstimated !== 'number' || hoursEstimated < 0) throw "You must enter the number of hours estimated"
    if(typeof completed !== 'boolean') throw "You must enter a bool val"
    if(!comments instanceof Array) throw "The comments must be an array"
    try {
      return this.getTaskById(id).then(currentTask => {
        let taskUpdateInfo = {
          title: title,
          description: description,
          hoursEstimated: hoursEstimated,
          completed: completed, //Boolean value
          comments: comments
        };
        let updateCommand = {
          $set: taskUpdateInfo
        };

        return tasks().then(taskCollection => {
          return taskCollection.updateOne({ _id: id }, updateCommand).then(() => {
            return this.getTaskById(id);
          });
        });
      });

    } catch(e){}
  },

  async taskPatch(id, patchedTask){
    if(typeof(id) !== 'string') throw "ID IS NOT VALID"
    if(!patchedTask) throw "Input cannot be null"
    try{
      const taskCollection = await tasks();
      let newTaskboy = {};
      if(patchedTask.title){
        newTaskboy.title = patchedTask.title;
      }
      if(patchedTask.description){
        newTaskboy.description = patchedTask.description;
      }
      if(patchedTask.description){
        newTaskboy.description = patchedTask.description;
      }
      if(patchedTask.hoursEstimated){
        newTaskboy.hoursEstimated = patchedTask.hoursEstimated;
      }
      if("completed" in patchedTask){
        newTaskboy.completed = patchedTask.completed;
      }
      let newData = {
        $set: newTaskboy
      }
      const patched = await taskCollection.updateOne({_id:id}, newData)
      return await this.getTaskById(id);
    }catch(e){
      console.log(e)
    }
  },
  async addComment(id, name, comment) {
    if (!id) throw "Please Provide a task ID"
    if (typeof name !== "string") throw "Names' gotta be a string"
    if (typeof comment !== "string") throw "You must provide a valid comment";


    const taskCollection = await tasks()
    const newComment = {
      _id: uuid.v4(),
      name: name,
      comment: comment
    };
    const added = await taskCollection.updateOne({_id:id}, {$push: {comments: newComment}})
    return {commentAdded: added.modifiedCount > 0, comment: comment}
 },
 async deleteComment(taskId, commentId){
   if(!taskId) throw "YOU MUST PROVIDE AN ID TO SEARCH FOR.";
   if(!commentId) throw "YOU MUST PROVIDE A COMMENT ID TO SEARCH FOR.";
   if(typeof taskId !=="string") throw "ID is not valid"
   if(typeof commentId !=="string") throw "ID IS NOT VALID"
  //  console.log("here")
  const taskCollection = await tasks()
   try{
    //  console.log(taskId)
     const deleted = await taskCollection.updateOne({ _id: taskId }, {$pull: {comments: {_id: commentId}}})
    //  console.log(deleted);
     return {commentDeleted: deleted.modifiedCount > 0}
   }catch(e){
     throw err;
   }
 }
};


module.exports = exportedMethods;
