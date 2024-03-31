const ul = document.querySelector("#items");
const input = document.querySelector("#input");
const checkIco=`<i class="fa-regular fa-circle check"></i>`;
// const delIco=`<i class="fa-solid fa-circle-xmark delete"></i>`;

const del=document.createElement("i");
del.classList.add('fa-solid','fa-circle-xmark','delete');

const updateLocalStorage = () => {
    // Storeing the tasks in ul to local storage
    localStorage.setItem("tasks", ul.innerHTML);
};

const load = () => {
    // Loading the tasks from local storage
    const tasks = localStorage.getItem("tasks");
    ul.innerHTML = tasks;
};

const submit = () => {
    const task = input.value;
    if (task == "") {
        alert("Please enter a task");
        return;
    }
    const li = document.createElement("li");
    li.classList.add("taskText");

    const liTxt = `${checkIco}${task}`;

    li.innerHTML = liTxt;
    li.appendChild(del);

    ul.appendChild(li);
    input.value = "";
    updateLocalStorage();
};

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        submit();
    }
});

ul.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.remove();
        updateLocalStorage();
    } else if (target.classList.contains("check")) {
        target.parentElement.classList.toggle('completed');
        target.classList.toggle('fa-circle');
        target.classList.toggle('fa-circle-check');
        updateLocalStorage();
    } else if (target.classList.contains("taskText")) {
        target.classList.toggle('completed');
        target.firstElementChild.classList.toggle('fa-circle');
        target.firstElementChild.classList.toggle('fa-circle-check');
        updateLocalStorage();
    }
});

const reset = () => {
    localStorage.clear();
    ul.innerHTML = ""
}

load();
