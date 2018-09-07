const connection = require("./config/mongoConnection")

async function main() {
  const db = await connection();
  await db.dropDatabase().catch(function(e){console.error(e.backtrace);});
  await db.serverConfig.close();

}

main();
