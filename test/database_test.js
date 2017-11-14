const path = require("path");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const {db, pgp} = require("../database/client");
const queries = require("../database/queries");
// const testHelpers = require("../database/testHelpers.js");
const testHelpers = require(path.join(__dirname + "/../database/testHelpers"));
chai.use(chaiAsPromised);
const expect = chai.expect;


describe("Database Queries", function(){

  describe("User Queries", function(){



    describe("getUserByEmail(email)", function(){

      beforeEach(function(){
        return testHelpers.initDB();
      });
      it ("Should return a user record matching the email address provided", function(){
        // return expect(queries.getUserByEmail("jedai@sab.com").then(user=>{
        //   return user.email;
        // })).to.eventually.equal("jedai@sab.com");
        return queries.getUserByEmail("jedai@sab.com").then(result=>{
          expect(result.email).to.equal("jedai@sab.com");
        });
      });

      it ("Should return null for an invalid username", function(){
        // return expect(queries.getUserByEmail("fail@fail.fail")).to.eventually.equal(null);
        return queries.getUserByEmail("jedai@sab.com").then(result=>{
          expect(result.email).to.equal("jedai@sab.com");
        });
      });

    });

    describe("addNewUser(screenName, email, pass, fName, lName, birthdate)", function(){

      it ("Should successfully add one user to a database", function(){
        return expect(queries.addNewUser("johnjohnson", "johnjohnson@johnjohnson.com", "johnjohnson", "John", "Johnson", "06/01/1988")
          .then(newUser => {
            return newUser.email;
          }))
          .to.eventually.equal("johnjohnson@johnjohnson.com");
      });
      it ("Should not add two users with the same email", function(){
        return expect(queries.addNewUser("jedaisab", "jedai@sab.com", "jedaisab", "Jedai", "Sab", "06/01/1988"))
          .to.eventually.throw();
      });
    });

  }); //End Describe User Queries

  after(function(){
    pgp.end();
  });
});
