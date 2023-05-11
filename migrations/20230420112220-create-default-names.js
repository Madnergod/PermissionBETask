module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    await db.createCollection('names')
    const names = db.collection('names')
    await names.insertMany([
      {name:'Arthur'},
      {name:'Kirill'}
    ])
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    await db.dropCollection('names')
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
