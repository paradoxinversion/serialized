const QueryFile = require("pg-promise").QueryFile;
const path = require("path");
const {db} = require("./client");
const seedDB = function(){
  const seedUsers = [
    {
      screen_name: "jedaisab",
      email: "jedai@sab.com",
      first_name: "Jedai",
      last_name: "Sab",
      password: "jedaisab",
      birthdate: "06/01/1988",
      join_date: "01/01/2000"
    }
  ];

  return Promise.all(seedUsers.map(user => {
    return db.none(`
      INSERT INTO
      users(screen_name, email, first_name, last_name, password, birthdate, join_date)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      `, [user.screen_name, user.email, user.first_name, user.last_name, user.password, user.birthdate, user.join_date]);
  }));
};

// const truncateDB = function(){
//   const tables = ['users', 'serials', 'serial_parts', 'serials_ratings',
//     'serial_parts_ratings', 'serials_comments', 'serial_parts_comments',
//     'serials_likes', 'serial_parts_likes', 'serial_subscriptions'];
//
//   return Promise.all(tables.map((table) => {
//     return db.none(`TRUNCATE ${table} RESTART IDENTITY CASCADE`);
//   }));
// };
const truncateDB = function(){


  return db.none(`
    TRUNCATE
    users, serials, serial_parts, serials_ratings,
    serial_parts_ratings, serials_comments, serial_parts_comments,
    serials_likes, serial_parts_likes, serial_subscriptions
    RESTART IDENTITY CASCADE
    `);
};
const initDB = function(){
  return truncateDB().then(()=>{
    return seedDB();
  });
};
module.exports = {
  initDB
};
