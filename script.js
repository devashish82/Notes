const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");
const errorMsg = document.getElementById("errorMsg");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Initial render
renderNotes();

// Add Note
addNoteBtn.addEventListener("click", () => {
  const text = noteText.value.trim();

  if (text === "") {
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");

  const newNote = {
    id: Date.now(),
    content: text
  };

  notes.push(newNote);
  saveAndRender();
  noteText.value = "";
});

// Render Notes
function renderNotes() {
  notesContainer.innerHTML = "";

  notes.forEach(note => {
    const noteCard = document.createElement("div");
    noteCard.className = "note-card";

    const noteContent = document.createElement("p");
    noteContent.textContent = note.content;

    const actions = document.createElement("div");
    actions.className = "note-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editNote(note.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteNote(note.id);

    actions.append(editBtn, deleteBtn);
    noteCard.append(noteContent, actions);
    notesContainer.appendChild(noteCard);
  });
}

// Edit Note
function editNote(id) {
  const note = notes.find(n => n.id === id);
  const updatedText = prompt("Edit your note:", note.content);

  if (updatedText !== null && updatedText.trim() !== "") {
    note.content = updatedText.trim();
    saveAndRender();
  }
}

// Delete Note
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveAndRender();
}

// Save + Render
function saveAndRender() {
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}
