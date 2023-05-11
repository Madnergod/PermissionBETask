module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    await db.createCollection('numbers')
    const numbers = db.collection('numbers')
    await numbers.insertMany([
      {number:0},
      {number:1},
      {number:2},
      {number:3},
      {number:4},
      {number:5},
      {number:6},
      {number:7},
      {number:8},
      {number:9}
    ])
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    await db.dropCollection('numbers')
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
