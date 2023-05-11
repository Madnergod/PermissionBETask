module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    await db.createCollection('letters')
    const letters = db.collection('letters')
    await letters.insertMany([
      {letter:'a'},
      {letter:'b'},
      {letter:'c'},
      {letter:'d'},
      {letter:'e'},
      {letter:'f'},
      {letter:'g'},
      {letter:'h'},
      {letter:'i'},
      {letter:'j'},
      {letter:'k'},
      {letter:'l'},
      {letter:'m'},
      {letter:'n'},
      {letter:'o'},
      {letter:'p'},
      {letter:'q'},
      {letter:'r'},
      {letter:'s'},
      {letter:'t'},
      {letter:'u'},
      {letter:'w'},
      {letter:'x'},
      {letter:'y'},
      {letter:'z'},
    ])
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    await db.dropCollection('letters')
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
