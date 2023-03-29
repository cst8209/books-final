/*
  1. Create a web application that pulls book data from the Seussology API (https://seussology.info/api/books).
  2. The application should display the title of each book.
  3. The application should allow the user to mark a book as read.
  4. Clicking on a book should display a modal with the book's title, description, and cover image.
*/

const $books = document.querySelector('#books')
const $modal = document.querySelector('.modal')
const readBooks = JSON.parse(window.localStorage.getItem('readBooks')) || []

function createBookTitle (title) {
  const $bookTitle = document.createElement('h2')
  $bookTitle.classList.add('book-title')
  $bookTitle.textContent = title
  return $bookTitle
}

function createBookButton (title) {
  const $readButton = document.createElement('button')
  $readButton.classList.add('book-button')

  if (readBooks.includes(title)) {
    console.log(title)
    $readButton.classList.add('read')
  }

  return $readButton
}

function createBook (book) {
  const $bookContainer = document.createElement('div')
  $bookContainer.classList.add('book')

  $bookContainer.dataset.title = book.title
  $bookContainer.dataset.description = book.description
  $bookContainer.dataset.image = book.image

  $bookContainer.append(createBookTitle(book.title), createBookButton(book.title))
  return $bookContainer
}

function renderBooks (books) {
  const $bookContainer = document.querySelector('#books')
  $bookContainer.innerHTML = ''
  books.forEach(function (book) {
    $bookContainer.append(createBook(book))
  })
}

async function fetchBooks () {
  const books = JSON.parse(window.localStorage.getItem('books'))

  if (!books) {
    const response = await fetch('https://seussology.info/api/books')
    const json = await response.json()
    window.localStorage.setItem('books', JSON.stringify(json))

    renderBooks(json)
  }

  renderBooks(books)
}

fetchBooks()

function createBookCover (imageURL) {
  const $bookCover = document.createElement('img')
  $bookCover.classList.add('book-cover')
  $bookCover.src = imageURL
  return $bookCover
}

function createModalContentTitle (title) {
  const $modalContentTitle = document.createElement('h3')
  $modalContentTitle.classList.add('modal-content-title')
  $modalContentTitle.textContent = title
  return $modalContentTitle
}

function createModalContentDescription (description) {
  const $modalContentDescription = document.createElement('p')
  $modalContentDescription.classList.add('modal-content-description')
  $modalContentDescription.textContent = description
  return $modalContentDescription
}

function createModalDetails (title, description) {
  const $modalDetails = document.createElement('div')
  $modalDetails.classList.add('modal-details')
  $modalDetails.append(
    createModalContentTitle(title),
    createModalContentDescription(description)
  )

  return $modalDetails
}

function createModalContent (book) {
  const $modalContent = document.createElement('div')
  $modalContent.classList.add('modal-content')
  $modalContent.append(
    createBookCover(book.image),
    createModalDetails(book.title, book.description)
  )

  return $modalContent
}

function addOrRemoveBook (title) {
  if (readBooks.includes(title)) {
    const index = readBooks.indexOf(title)
    readBooks.splice(index, 1)
  } else {
    readBooks.push(title)
  }

  console.log(readBooks)
}

$books.addEventListener('click', function (event) {
  const book = event.target.closest('.book')
  if (book) {
    const title = book.dataset.title

    console.log(event.target)

    if (event.target.matches('.book-button')) {
      event.target.classList.toggle('read')
      addOrRemoveBook(title)
      fetchBooks()
    } else {
      $modal.innerHTML = ''
      $modal.appendChild(createModalContent(book.dataset))
      $modal.classList.add('show')
    }
  }
})

$modal.addEventListener('click', function (event) {
  if (event.target === $modal) {
    $modal.classList.remove('show')
  }
})
