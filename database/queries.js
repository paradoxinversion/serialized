const {db, pgp} = require("../database/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Returns a user by email address if it exists. Null if not.
const getUserByEmail = function(email){
  return db.oneOrNone(`
    SELECT * FROM users WHERE users.email = $1
    `,[email])
    .then(data => {
      return data;
    })
    .catch(e => {
      throw e;
    });
};

//Checkes a hashed password against a plaintext one
const checkUserCredentials = function(password, hashedPassword){
  return bcrypt.compare(password, hashedPassword).then(res => res);
};

const getUserById = function(id){
  return db.one(`SELECT * FROM users WHERE users.id = $1`, [id])
    .catch(e =>{
      throw e;
    });
};

// Adds a new user, returning the user.
const addNewUser = function(screenName, email, pass, fName, lName, birthdate ){
  return db.oneOrNone(
    `
      SELECT users.email FROM users WHERE users.email=$1
    `
    ,[email])
    .then(userEmail=>{

      if (userEmail === null){
        return bcrypt.hash(pass, saltRounds).then(function(hashedPass){
          return db.one(
            `
            INSERT INTO users(screen_name, email, first_name, last_name, password,
            birthdate, join_date)
            VALUES ($1, $2, $3, $4, $5, $6, now()) RETURNING *
            `
            , [screenName, email, fName, lName, hashedPass, birthdate])
            .then(newUser =>{
              return setUserRole(newUser, 2)
                .catch(e => {
                  throw e;
                });
            })
            .catch((e) =>{
              throw e;
            });
        });
      } else{
        const error = new Error("user already exists");
        throw error;
      }
    });
};

//Grants a user a new role
const setUserRole = function(user, newRole){
  return db.query(
    `
      INSERT INTO users_roles
      VALUES ($1, $2)
    `,
    [user.id, newRole]
  );
};

const getUserRole = function(user){
  return db.query(
    `
      SELECT role FROM users_roles WHERE users_roles.user_id=$1
    `,
    [user.id]
  );
};

const getUserBiography = function(user){
  return db.oneOrNone(
    `
      SELECT biography FROM users WHERE users.id=$1
    `,
    [user.id]
  );
}
module.exports = {
  addNewUser,
  getUserByEmail,
  getUserById,
  checkUserCredentials,
  setUserRole,
  getUserRole,
  getUserBiography
};
