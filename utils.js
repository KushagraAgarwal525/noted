export const registerForm = document.querySelector("#register-form");
export const loginForm = document.querySelector("#login-form");
export const noteForm = document.querySelector("#note-form");

let token = "";

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const showLogin = () => {
  registerForm.parentElement.classList.add("hidden");
  loginForm.parentElement.classList.remove("hidden");
  noteForm.parentElement.classList.add("hidden");
};

export const showRegister = () => {
  registerForm.parentElement.classList.remove("hidden");
  loginForm.parentElement.classList.add("hidden");
  noteForm.parentElement.classList.add("hidden");
};

export const showNoteForm = () => {
  registerForm.parentElement.classList.add("hidden");
  loginForm.parentElement.classList.add("hidden");
  noteForm.parentElement.classList.remove("hidden");
};

export const register = async (username, password) => {
  let data = await fetch("http://localhost:3000/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });
  data = await data.json();
  return data;
};

export const login = async (username, password) => {
  let data = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });
  data = await data.json();
  setToken(data.token);
  return data;
};

export const newNote = async (note) => {
  const url = await getCurrentTab();
  console.log(url);
  let data = await fetch("http://localhost:3000/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
    body: JSON.stringify({ url: url, note: note }),
  });
  data = await data.json();
};

export const fillNotes = async () => {
  const currentTab = await getCurrentTab();
  let user = await fetch("http://localhost:3000/api/token/", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  user = await user.json();
  console.log(user);
  let data = await fetch(`http://localhost:3000/api/users/${user.id}`);
  data = await data.json();
  console.log(data);
  let notes = await data.notes;
  console.log(notes);
  notes = await notes.filter((note) =>
    note.url === currentTab ? true : false
  );
  for (let note of notes) {
    const noteDiv = document.createElement("div");
    noteDiv.innerHTML = `<div class="note">${note.note}</div><div class="light-text">${note.timestamp}</div>`;
    document.querySelector(".notes").appendChild(noteDiv);
  }
};

const getCurrentTab = async () => {
  let currentTab;
  const tabs = await chrome.tabs.query({ currentWindow: true, active: true });
  currentTab = tabs[0].url;
  console.log("second", currentTab);
  return currentTab;
};
