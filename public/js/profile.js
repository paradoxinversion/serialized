$(function(){
  let bioElement = $("#bio");
  // button may be undefined if user is not logged in/authed
  const editProfileButton = $("#btn-edit-profile");
  //Quill will be undefined until edit mode is entered
  let editorContainer;
  let quill;
  let saveButton;

  const buildSaveButton = function(){
    let profileText;
    saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.id = "btn-save-profile";

    saveButton.addEventListener("click", function(){
      console.log(window.location.href);
      if (quill){
        console.log(quill.getText(0));
        profileText = {
          text: quill.getText(0)
        };
        fetch(window.location.href, {
          method: 'PUT',
          body: JSON.stringify(profileText),
          credentials: 'include',
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        }).then(()=>{
          window.location.reload();
        }).catch(e =>{
          throw e;
        });
      }
    });

    return saveButton;
  };

  const openProfileEdit = function(){
    editorContainer = document.createElement("div");
    editorContainer.id = "editor-container";
    const editor = document.createElement("div");
    editor.id = "editor";

    saveButton = buildSaveButton();

    editorContainer.appendChild(editor);
    editorContainer.appendChild(saveButton);

    bioElement.replaceWith(editorContainer);
    quill = new Quill("#editor", {
      theme: "snow"
    });
    editProfileButton.remove();
  };

  editProfileButton.on("click", function(){
    openProfileEdit();
  });

});
