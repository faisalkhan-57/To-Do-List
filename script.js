const listContainer = document.querySelector("#listContainer");
let data = localStorage.getItem("data");
listContainer.innerHTML = data;
const addBtn = document.querySelector("#addBtn");

// When User Clicks on Add Button.
addBtn.addEventListener("click", () => {
  const taskInput = document.querySelector("#taskInput").value;

  // If there is an Input.
  if (taskInput) {
    const newListItem = document.createElement("li");
    newListItem.textContent = taskInput;
    const newSpan = document.createElement("span");
    newSpan.innerHTML = "\u00d7";
    newSpan.classList.add("delete-btn");
    newSpan.title = "delete";

    newListItem.appendChild(newSpan);

    listContainer.prepend(newListItem);

    document.querySelector("#taskInput").value = "";
    saveData();

    showPopup("Task Added");
  }
  // And if there is no Input.
  else {
    document.querySelector("#popup").style.display = "flex";
    document.querySelector("#taskInput").disabled = true;
    addBtn.disabled = true;
    document.querySelector("#closePopup").addEventListener("click", () => {
      document.querySelector("#popup").style.display = "none";

      document.querySelector("#taskInput").disabled = false;
      addBtn.disabled = false;
    });
  }
});

// when user clicks on a task.
listContainer.addEventListener("click", (e) => {
  // If clicked on the cross icon.
  if (e.target.classList.contains("delete-btn")) {
    e.target.parentElement.remove();
    saveData();
  }
  // If clicked anywhere on the task except the cross icon.
  else if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
});

// Function to save tasks in localStorage.
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show popup after a task is added.
function showPopup(toastText) {
  let toast = document.createElement("div");
  toast.classList.add("toast");

  toast.textContent = toastText;

  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
}
