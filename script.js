// popup window

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // dataset allows to open all of the data attributes
    const modal = document.querySelector(button.dataset.modalTarget);

    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => closeModal(modal));
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    console.log(modal);
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

// popup window

const author = document.getElementById("author");
const title = document.getElementById("title");
const pages = document.getElementById("number-of-pages");
const readYet = document.getElementById("read-yet");
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");
const bookSection = document.querySelector(".book_section");
const form = document.querySelector(".modal-body");

reset.addEventListener("click", () => {
  author.value = "";
  title.value = "";
  pages.value = "";
  readYet.value = "";
});

function book(author, title, pages, readYet) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.readYet = readYet;
}

// submit button has to be attached with form
const library = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const addBookToLibrary = new book(
    author.value,
    title.value,
    pages.value,
    readYet.value
  );

  library.push(addBookToLibrary);

  const newDiv = document.createElement("div");
  const deleteButton = document.createElement("button");
  const readButton = document.createElement("button");
  // delete button
  deleteButton.textContent = "Remove";
  deleteButton.addEventListener("click", () => bookSection.removeChild(newDiv));
  deleteButton.classList = "delete-button";
  // read button
  readButton.textContent = "Read";
  readButton.classList = "read-button";
  if (readYet.checked === false) {
    readButton.style.backgroundColor = "red";
    readButton.textContent = "Not Read";
  } else {
    readButton.style.backgroundColor = "green";
    readButton.textContent = "Read";
  }

  readButton.addEventListener("click", () => {
    if (readButton.style.backgroundColor === "red") {
      readButton.style.backgroundColor = "green";
      readButton.textContent = "Read";
    } else {
      readButton.style.backgroundColor = "red";
      readButton.textContent = "Not Read";
    }
  });

  const newAuthor = document.createElement("p");
  newAuthor.appendChild(
    document.createTextNode(`Author: ${addBookToLibrary.author} `)
  );
  const newTitle = document.createElement("p");
  newTitle.appendChild(
    document.createTextNode(`Title: ${addBookToLibrary.title}`)
  );
  const newPage = document.createElement("p");
  newPage.appendChild(
    document.createTextNode(`Pages: ${addBookToLibrary.pages}`)
  );

  newDiv.append(newAuthor, newTitle, newPage, readButton, deleteButton);

  bookSection.appendChild(newDiv);

  author.value = "";
  title.value = "";
  pages.value = "";
  readYet.value = "";

  modal.classList.remove("active");
  overlay.classList.remove("active");
});
