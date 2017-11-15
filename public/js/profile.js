$(function(){
  console.log("Login page");
  const bioElement = $("#bio");
  // button may be undefined if user is not logged in/authed
  const editProfileButton = $("#btn-edit-profile");

  editProfileButton.on("click", function(event){
    const editContainer = document.createElement("div");
    const editor = document.createElement("div");
    editor.id = "editor";

    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";


    editContainer.appendChild(editor);
    editContainer.appendChild(saveButton);

    bioElement.replaceWith(editContainer);
    const quill = new Quill("#editor", {
      theme: "snow"
    });
  });
});
