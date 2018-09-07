const dbConnection = require("../config/mongoConnection");
const {users, posts, tasks} = require("../data/");

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();
  const phil = await users.addUser("Phil", "Barresi");

  const test = await tasks.addTask("Do something", "Flip","die","sad");

  const id = phil._id;
  const id2 = test._id;

  //
  const newTask = await tasks.addTask("test","test","test","test",id2);


  const firstPost = await posts.addPost(
    "Hello, class!",
    "Today we are creating a blog!",
    id
  );
  const second = await posts.addPost(
    "Using the seed",
    "We use the seed to have some initial data so we can just focus on servers this week",
    id
  );
  const third = await posts.addPost(
    "Using routes",
    "The purpose of today is to simply look at some GET routes",
    id
  );

  const fourth = await posts.addPost(
    "Testing",
    "Tits",
    id
  )

// ---------------------------------------------------------------------------------------------------


  console.log("Done seeding database");


  await db.serverConfig.close();



};

main().catch(console.log);
