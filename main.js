document.getElementById("add-task-button").addEventListener("click", function () {
    let newTaskText = document.getElementById("input-task").value;
    let htmlToAdd = '<li><div class="input-group mb-3"><div class="input-group-text"><input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input"><span class="task"></span><button class="delete-btn btn btn-danger">X</button></div></div></li>';
    if(newTaskText != "") {
        document.querySelector("#task-list").innerHTML += htmlToAdd;
        let lastLI = document.querySelector('ul > li:last-child');
        lastLI.querySelector(".task").innerHTML = newTaskText;
        taskList[newTaskText] = "active";
        document.getElementById("input-task").value = "";
        removeHandler();
        checkBoxClick();
    }
})

function removeHandler () {
  let removeButtons = document.getElementsByClassName("delete-btn");
  for (let button of removeButtons) {
      button.addEventListener("click", function () {
          delete taskList[button.parentElement.querySelector(".task").innerHTML];
          button.parentElement.parentElement.parentElement.remove();
      })
  }
}

function checkBoxClick () {
    let checkBoxes = document.getElementsByClassName("form-check-input");
    for (let checkBox of checkBoxes) {
        checkBox.addEventListener("click", function () {
            checkBox.parentElement.querySelector(".task").classList.toggle("line-trough");
            if (taskList[checkBox.parentElement.querySelector(".task").innerHTML] == "active") {
                taskList[checkBox.parentElement.querySelector(".task").innerHTML] = "completed";
            } else {
                taskList[checkBox.parentElement.querySelector(".task").innerHTML] = "active";
            }
        })
    }
}

function compileTasks () {
    for (let task in taskList) {
        let checked = "";
        let lineTroughClass = "";
        if (taskList[task] == "completed") {
            checked = "checked";
            lineTroughClass = " line-trough";
        }
        let htmlToAdd = '<li><div class="input-group mb-3"><div class="input-group-text"><input class="form-check-input mt-0" type="checkbox" value="" aria-label="Checkbox for following text input" '+ checked + '><span class="task' + lineTroughClass + '">' + task + '</span><button class="delete-btn btn btn-danger">X</button></div></div></li>';
        document.querySelector("#task-list").innerHTML += htmlToAdd;
    }
}

let taskList = JSON.parse(localStorage.getItem("tasks")) || {};
compileTasks();
removeHandler();
checkBoxClick();

window.addEventListener("beforeunload", function() {
    localStorage.setItem("tasks", JSON.stringify(Object.assign({}, taskList)));
});

