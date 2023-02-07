const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const addBtn = document.querySelector(".btn");
const titleTag = document.querySelector("input");
const descTag = document.querySelector("textarea");
const popUpTitle=document.querySelector('h2');

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate=false, updateId;


/* Show of PopupBox */
addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});


/* Closing PopupBox */
closeIcon.addEventListener("click", () => {
  titleTag.value='';
  descTag.value='';
  popUpTitle.innerText='Add a Note';
  addBtn.innerText='Add a Note';
  popupBox.classList.remove("show");
});

/* Shwo Notes */

function showNotes() {

  document.querySelectorAll(".notes").forEach((note) => {
    note.remove();
  });
  notes.forEach((note,index) => {
    let litag = `
    <li class="notes">
      <div class="details">
        <p>${note.noteTitle} </p>
        <span>${note.noteDesc}</span>
      </div>
      <div class="bottom-content">
        <span>${note.time}</span>
        <div class="settings">
          <i onClick="showMenu(this)" class="fas fa-ellipsis"></i>
        <ul class="menu">
          <li onClick="updateNotes(${index}, '${note.noteTitle}', '${note.noteDesc}' )"  class="one"><i class="fa fa-pen"></i>Edit</li>
          <li onClick='deleteNote(${index})' class="two"><i class="fa fa-trash"></i>Delete</li>
        </ul>
        </div>
      </div>
    </li>
    `;
    addBox.insertAdjacentHTML("afterend", litag);
  });
}

showNotes();


/* Show Menu on Click */

function showMenu(elem){
  elem.parentElement.classList.add('show');
  document.addEventListener('click',e =>{
    if(e.target.tagName!='I'|| e.target!=elem){
      elem.parentElement.classList.remove('show');
    }
  })
}

/* Delete Note from List */

function deleteNote(noteId){
    notes.splice(noteId,1);
    localStorage.setItem("notes",JSON.stringify(notes)); 
    showNotes();
}


/* Update Note from List */

function updateNotes(noteId,title,desc){
  isUpdate=true;
  updateId=noteId;
  popUpTitle.innerText='Update a Note';
  addBtn.innerText='Update Note';
  addBox.click();
  titleTag.value=title;
  descTag.value=desc;
}

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = titleTag.value,
    desc = descTag.value;

  if (title || desc) {
    let dateObj = new Date();
    let date = dateObj.getDate();
    let month = months[dateObj.getMonth()];
    let year = dateObj.getFullYear();
    let noteInfo = {
      noteTitle: title,
      noteDesc: desc,
      time: `${month} , ${date} ${year}`,
    };

   
    if(!isUpdate){
    notes.push(noteInfo);
    }
    else{
      notes[updateId]=noteInfo;
    }
    localStorage.setItem("notes",JSON.stringify(notes));
    closeIcon.click();
    showNotes();
  }
});
