'use strict';

// Add Event Listeners to Buttons
document.querySelector(`.add-schedule`).onclick = addScheduleItem;
document.querySelector(`.priority-add`).onclick = addPriorityItem;
document.querySelector(`.priority-remove`).onclick = removePriorityItem;
document.querySelector(`.todo-add`).onclick = addTodoItem;
document.querySelector(`.todo-remove`).onclick = removeTodoItem;
document.querySelector(`.notes-add`).onclick = addNotesItem;
document.querySelector(`.notes-remove`).onclick = removeNotesItem;

function markComplete(event) {
    const li = event.target;
    li.classList.toggle(`mark-complete`);
}

function alertRemove(event) {
    const choice = confirm(`Do you want to remove this schedule item?`);
    if (choice === true) {
        event.target.remove();
    } else {
        return
    }
}

function removeError(event) {
    event.target.innerText = ``;
}

// -------------------------------
// Add or Remove items to schedule
// -------------------------------
function printSchedule(value, start, end) {
    //Check if start time is after end time
    if (start >= end) {
        alert(`End time cannot be after, or equal to, Start time`);
        return
    }

    const listArea = document.querySelector(`.schedule-ul`);
    const li = document.createElement(`li`);

    //Get a vaiable to display AM or PM
    const timeMarkStart = (start < 11) ? `am` : `pm`;
    const timeMarkEnd = (end < 11) ? `am` : `pm`;
    let timeReduceStart = start;
    let timeReduceEnd = end;
    
    //Use dropdown menu value to convert to 'normal' time hours
    if (start > 12) {
        timeReduceStart -= 12;
    }
    if (end > 12) {
        timeReduceEnd -= 12;
    }
    
    li.innerText = `${timeReduceStart}${timeMarkStart} - ${timeReduceEnd}${timeMarkEnd}: ${value}`;
    li.onclick = alertRemove;

    listArea.appendChild(li);
}

function addScheduleItem() {
    const item = document.querySelector(`.schedule-input`);
    const startVal = document.querySelector(`.start-time`).value;
    const start = Number(startVal);
    const endVal = document.querySelector(`.end-time`).value;
    const end = Number(endVal);
    const addItem = item.value;

    if (item.value === ``) {
        const error = document.querySelector(`.schedule-error`);
        error.innerText = `Schedule item cannot be empty`;
        error.style.color = `red`;
        error.onclick = removeError;
        return
    } else {
        document.querySelector(`.schedule-error`).innerText = ``;
    }

    printSchedule(addItem, start, end);
    item.value = null;
    item.focus();
}

// ---------------------------------
// Add or remove items from priority
// ---------------------------------
function printPriority(value) {
    const listArea = document.querySelector(`.priority-ul`);
    const li = document.createElement(`li`);

    li.innerText = value;
    li.onclick = markComplete;

    listArea.appendChild(li);
}

function addPriorityItem() {
    const item = document.querySelector(`.priority-input`);
    const addItem = item.value;

    if (item.value === ``) {
        const error = document.querySelector(`.priority-error`);
        error.innerText = `Priority item cannot be empty`;
        error.style.color = `red`;
        error.onclick = removeError;
        return
    } else {
        document.querySelector(`.priority-error`).innerText = ``;
    }

    //Ensures only three items can be on the priority list
    if (document.querySelectorAll(`.priority-ul li`).length >= 3) {
        alert(`Cannot have more than three (3) items on the priority list`);
        return
    }
    
    printPriority(addItem);
    item.value = null;
    item.focus();
}

function removePriorityItem() {
    const listArea = document.querySelectorAll(`.priority-ul li`);
    for (let i = 0; i < listArea.length; i++) {
        if (listArea[i].className === `mark-complete`) {
            listArea[i].remove();
        }
    }
}


// ---------------------------------
// Add or remove items for todo list
// ---------------------------------
function printTodo(value) {
    const listArea = document.querySelector(`.todo-ul`);
    const li = document.createElement(`li`);

    li.innerText = value;
    li.onclick = markComplete;

    listArea.appendChild(li);
}

function addTodoItem() {
    const item = document.querySelector(`.todo-input`);
    const addItem = item.value;

    if (item.value === ``) {
        const error = document.querySelector(`.todo-error`);
        error.innerText = `To Do item cannot be empty`;
        error.style.color = `red`;
        error.onclick = removeError;
        return
    } else {
        document.querySelector(`.todo-error`).innerText = ``;
    }

    printTodo(addItem);
    item.value = null;
    item.focus();
}

function removeTodoItem() {
    const listArea = document.querySelectorAll(`.todo-ul li`);
    for (let i = 0; i < listArea.length; i++) {
        if (listArea[i].className === `mark-complete`) {
            listArea[i].remove();
        }
    }
}

// -------------------------------------
// Add or remove items for notes section
// -------------------------------------
function printNotes(value) {
    const listArea = document.querySelector(`.notes-ul`);
    const li = document.createElement(`li`);

    li.innerText = value;
    li.onclick = markComplete;

    listArea.appendChild(li);
}

function addNotesItem() {
    const item = document.querySelector(`.notes-input`);
    const addItem = item.value;

    if (item.value === ``) {
        const error = document.querySelector(`.notes-error`);
        error.innerText = `Note item cannot be empty`;
        error.style.color = `red`;
        error.onclick = removeError;
        return
    } else {
        document.querySelector(`.notes-error`).innerText = ``;
    }

    printNotes(addItem);
    item.value = null;
    item.focus();
}

function removeNotesItem() {
    const listArea = document.querySelectorAll(`.notes-ul li`);
    for (let i = 0; i < listArea.length; i++) {
        if (listArea[i].className === `mark-complete`) {
            listArea[i].remove();
        }
    }
}

const todayDate = new Date().toDateString();


// ----------------------------------
// Media query changes via Javascript
// ----------------------------------
const mediaChange = window.matchMedia(`(max-width: 1024px)`);
inputBoxChange(mediaChange);
mediaChange.addListener(inputBoxChange);

function inputBoxChange(mediaChange) {
    if (mediaChange.matches) {
        document.querySelector(`.priority-input`).size = `25`;
        document.querySelector(`.todo-input`).size = `25`;
        document.querySelector(`.notes-input`).size = `25`;
        document.querySelector(`.title-smaller`).innerText = `\nCode Immersives Branch - - - ${todayDate}`;
    } else {
        document.querySelector(`.priority-input`).size = `40`;
        document.querySelector(`.todo-input`).size = `40`;
        document.querySelector(`.notes-input`).size = `60`;
        document.querySelector(`.title-smaller`).innerText = ` Code Immersives Branch - - - ${todayDate}`;
    }
}