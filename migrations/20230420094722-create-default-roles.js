module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    await db.createCollection("roles");
    const roles = db.collection("roles");
    const adminAllowedEndpoints = await db
      .collection("endpoints")
      .find()
      .toArray();
    const resultArray = adminAllowedEndpoints.map((item) => {
      return item._id;
    });
    const userAllowedEndpoint = resultArray.slice(0, 3);
    await roles.insertMany([
      { name: "Admin", allowedEndpoints: resultArray },
      { name: "Moderator", allowedEndpoints: resultArray },
      { name: "User", allowedEndpoints: userAllowedEndpoint },
      { name: "Guest", allowedEndpoints: [] },
    ]);
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    await db.dropCollection("roles");
    const roles = db.collection("roles");
    await roles.deleteMany({});
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  },
};
