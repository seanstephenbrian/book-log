let myLog = [
    {title: '1984', author: 'George Orwell', pages: 328, rating: 2},
    {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: 208, rating: 1},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194, rating: 3},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194, rating: 5},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194, rating: 4},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194}
];

function Book(title, author, pages, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.rating = rating;
}

function addBookToLog(title, author, pages, rating) {
    let newBook = new Book(title, author, pages, rating);
    myLog.push(newBook);
}

function generateLog(log) {
    const logContainer = document.querySelector('.log-container');
    log.forEach(book => {
        if (book.rating === 1) {
            book.rating = `<img src='img/svg/star.svg' alt='Star icon'>`;
        } else if (book.rating === 2) {
            book.rating = `<img src='img/svg/star.svg' alt='Star icon'><img src='img/svg/star.svg' alt='Star icon'>`;
        } else if (book.rating === 3) {
            book.rating = `<img src='img/svg/star.svg' alt='Star icon'><img src='img/svg/star.svg' alt='Star icon'><img src='img/svg/star.svg' alt='Star icon'>`;
        } else if (book.rating === 4) {
            book.rating = `<img src='img/svg/star.svg' alt='Star icon'><img src='img/svg/star.svg' alt='Star icon'><img src='img/svg/star.svg' alt='Star icon'><img src='img/svg/star.svg' alt='Star icon'>`;
        } else if (book.rating === 5) {
            book.rating = `<img src='img/svg/star.svg' alt='Star icon'><img src='img/svg/star.svg' alt='Star icon'><img src='img/svg/star.svg' alt='Star icon'><img src='img/svg/star.svg' alt='Star icon'><img src='img/svg/star.svg' alt='Star icon'>`;
        }
        const loggedBook = logContainer.appendChild(document.createElement('div'));
        loggedBook.classList.add('logged-book');
        for (property in book) {
            const bookProperty = loggedBook.appendChild(document.createElement('div'));
            bookProperty.classList.add(`book-${property}`);
            bookProperty.innerHTML = `<div>${property}:</div><div>${book[property]}</div>`;
        };
    });
    const addBook = logContainer.appendChild(document.createElement('div'));
    addBook.classList.add('add-book');
    addBook.innerHTML = `<img src='img/svg/add.svg' alt='Add a new book' onclick='showAddBookForm()'>`;
}

generateLog(myLog);

function showAddBookForm() {
    const mainSection = document.querySelector('.main');
    mainSection.classList.add('blur');
    const addBookFormContainer = document.querySelector('.add-book-form-container');
    addBookFormContainer.classList.remove('hide');
    const addBookForm = document.querySelector('.add-book-form');
    addBookForm.classList.remove('hide');
}

function closeAddBookForm() {
    const mainSection = document.querySelector('.main');
    mainSection.classList.remove('blur');
    const addBookFormContainer = document.querySelector('.add-book-form-container');
    addBookFormContainer.classList.add('hide');
    const addBookForm = document.querySelector('.add-book-form');
    addBookForm.classList.add('hide');
}

const ratingSelector = document.querySelector('#rating');

function showRatingSelection() {
    const userRating = document.querySelector('.user-rating');
    userRating.textContent = ratingSelector.value; 
}

showRatingSelection();

ratingSelector.addEventListener('change', showRatingSelection);