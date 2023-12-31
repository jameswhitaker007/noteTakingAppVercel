$(document).ready(function () {
  buildContent();
  $("#select").on("change", function () {
    /*
    if ($("#select").val() == "update") {
      $("#update").css("display", "inline");
      $("#note").css("placeholder", "Enter your update here");
    } else {
      $("#update").css("display", "none");
    }
    */

    let action = $("#select").val();
    $("#update").css("display", "none");

    switch (action) {
      case "add":
        $("#note").attr("placeholder", "Enter the note you want to add here");
        break;
      case "delete":
        $("#note").attr("placeholder", "Enter the note you want to delete here");
        break;
      case "update":
        $("#note").attr(
          "placeholder",
          "Enter your new update here"
        );
        $("#update").css("display", "inline");
    }
  });

  $("#submit").on("click", function (e) {
    e.preventDefault();
    let action = $("#select").val();
    let note = $("#note").val();
    if (note == "") return;

    switch (action) {
      case "add":
        fetch("/createNote", {
          method: "POST",
          body: JSON.stringify({
            note: note,
          }),
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
        }).then(location.reload());
        break;
      case "delete":
        fetch("/deleteNote", {
          method: "POST",
          body: JSON.stringify({
            note: note,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then(location.reload());
        break;
      case "update":
        if ($("#update").val() == "") return;
        fetch("/updateNote", {
          method: "POST",
          body: JSON.stringify({
            newNote: note,
            noteToUpdate: $("#update").val(),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then(location.reload());
    }
  });
});

async function buildContent() {
  const response = await fetch("/getNotes")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  document.getElementById("content").innerHTML = `<ul>${createList(
    response.notes
  )}</ul>`;
}

function createList(list) {
  text = "";
  for (let i of list) {
    text += `<li>${i}</li>`;
  }
  return text;
}
