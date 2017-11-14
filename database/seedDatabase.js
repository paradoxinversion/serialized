const faker = require("faker");
const queries = require("../database/queries");

const createNewUser = function(){
  return {
    firstName : faker.name.firstName(),
    lastName : faker.name.lastName(),
    email : faker.internet.email(),
    password : faker.internet.password(),
    screenName : faker.internet.userName(),
    birthDate : faker.date.between('Jan 1, 1971', 'Jan 1, 2004').toISOString().slice(0,10),
  };
};


const createSeedUsers = function(){
  const users = [];
  for (let i = 0; i < 100; i++){
    users.push(createNewUser());
  }
};
module.exports = {
  createNewUser
};
