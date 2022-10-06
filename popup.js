import {
  registerForm,
  loginForm,
  noteForm,
  showRegister,
  showLogin,
  showNoteForm,
  register,
  login,
  newNote,
  fillNotes
} from "./utils.js";

let currentTab;

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = registerForm["username"].value;
  const password = registerForm["password"].value;
  const data = await register(username, password);
  if (!data.error) {
    registerForm["username"].value = "";
    registerForm["password"].value = "";
    showLogin();
  }
});

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = loginForm["username"].value;
  const password = loginForm["password"].value;
  const data = await login(username, password);
  if (!data.error) {
    loginForm["username"].value = "";
    loginForm["password"].value = "";
    data.token && localStorage.setItem("user", JSON.stringify(data));
    showNoteForm();
    fillNotes();
  }
});

noteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const noteTextArea = document.querySelector("#note");
  const note = noteTextArea.value;
  noteTextArea.value = "";
  newNote(note);
});

document.querySelector("#switch-to-register").addEventListener("click", () => {
  showRegister();
});

document.querySelector("#switch-to-login").addEventListener("click", () => {
  showLogin();
});


