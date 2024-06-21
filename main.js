const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
  this.info = () => {
    console.log(
      `${this.title} by ${this.author}, has ${this.pages} pages, ${this.hasRead}`
    );
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function displayBooks() {
  const cardsContainer = document.querySelector(".cards");
  cardsContainer.textContent = ""; // Clear the container first

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const hasRead = document.createElement("p");
    hasRead.textContent = `${book.hasRead}`;

    const toggleRead = document.createElement("button");
    toggleRead.classList.add("toggleRead");
    toggleRead.textContent = "Toggle Read";
    toggleRead.addEventListener("click", (event) => {
      if (hasRead.textContent === "Not read") {
        hasRead.textContent = "Read";
      } else {
        hasRead.textContent = "Not read";
      }
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "X";
    removeButton.setAttribute("data-index", index);
    removeButton.addEventListener("click", (event) => {
      const bookIndex = event.target.getAttribute("data-index");
      removeBookFromLibrary(bookIndex);
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(hasRead);
    card.appendChild(removeButton);
    card.appendChild(toggleRead);

    cardsContainer.appendChild(card);
  });
}

// Manually adding books to the array for demonstration
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", "Not read");
const lotr = new Book(
  "The Lord of The Rings",
  "J.R.R. Tolkien",
  "295",
  "Not read"
);
const Mario = new Book("The Mario Movie", "Nintendo", "295", "Not read");

addBookToLibrary(Mario);
addBookToLibrary(theHobbit);
addBookToLibrary(lotr);

displayBooks();

const newBookBtn = document.getElementById("newBookBtn");
const bookFormModal = document.getElementById("bookFormModal");
const bookForm = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => {
  bookFormModal.showModal();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  // Get the form data
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const hasRead = document.getElementById("hasRead").value;

  // Create a new book and add it to the library
  const newBook = new Book(title, author, pages, hasRead);
  addBookToLibrary(newBook);

  // Display the updated list of books
  displayBooks();

  // Close the modal and reset the form
  bookFormModal.close();
  bookForm.reset();
});
