/*
  1. Create a web application that pulls book data from the Seussology API (https://seussology.info/api/books).
  2. The application should display the title of each book.
  3. The application should allow the user to mark a book as read.
  4. Clicking on a book should display a modal with the book's title, description, and cover image.
*/

const $books = document.querySelector('#books')
const $modal = document.querySelector('.modal')

function createBookTitle (title) {
  const $bookTitle = document.createElement('h2')
  $bookTitle.classList.add('book-title')
  $bookTitle.textContent = title
  return $bookTitle
}

function createBookButton () {
  const $readButton = document.createElement('button')
  $readButton.classList.add('book-button')

  return $readButton
}

function createBook (book) {
  const $bookContainer = document.createElement('div')
  $bookContainer.classList.add('book')

  $bookContainer.append(createBookTitle(book.title), createBookButton())
  return $bookContainer
}

function renderBooks (books) {
  const $bookContainer = document.querySelector('#books')
  $bookContainer.innerHTML = ''
  books.forEach(function (book) {
    $bookContainer.append(createBook(book))
  })
}
