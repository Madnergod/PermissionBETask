const bcrypt = require("bcrypt");
module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    await db.createCollection("users");
    const users = db.collection("users");
    const adminRole = await db.collection("roles").findOne({ name: "Admin" });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash("admin", salt);
    const user = await users.insertOne({
      name: "God",
      roleId: `${adminRole._id}`,
      email: "admin@mail.ru",
      passwordHash: hash,
    });
    console.log(user);
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    const users = db.collection("users");
    await users.deleteOne({
      name: "God",
      role: "Admin",
      login: "admin",
      password: "admin",
    });
    await db.dropCollection("users");
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
