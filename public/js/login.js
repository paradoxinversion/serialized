$(function(){
  const logInForm = {
    $emailField: $("input[name=email-input]"),
    $passwordField: $("input[name=password-input]")
  };
  logInForm.$emailField.on("input", function(event){
    //validate email
    console.log(logInForm.$emailField.val());
  });

  logInForm.$passwordField.on("input", function(event){
    //validate password
  })

});
