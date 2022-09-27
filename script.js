// set custom title

const user = 'hannah';

const title = document.querySelector('.log-title');

title.textContent = `${user}'s book log`;

let myLog = [];

function Book(title, author, pages, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.rating = rating;
}

function generateLog(log) {
    console.log('generateLog fired');
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
        loggedBook.dataset.index = log.indexOf(book);
        for (property in book) {
            const bookProperty = loggedBook.appendChild(document.createElement('div'));
            bookProperty.classList.add(`book-${property}`);
            bookProperty.innerHTML = `<div>${property}:</div><div>${book[property]}</div>`;
        };
        const removeBook = loggedBook.appendChild(document.createElement('div'));
        removeBook.classList.add('remove-book');
        const removeButton = removeBook.appendChild(document.createElement('div'));
        removeButton.classList.add('remove-button');
        removeButton.dataset.index = log.indexOf(book);
        removeButton.textContent = `remove book`;
    });
    const addBook = logContainer.appendChild(document.createElement('div'));
    addBook.classList.add('add-book');
    addBook.innerHTML = `<img src='img/svg/add.svg' alt='Add a new book' onclick='showAddBookForm()'>`;
}

generateLog(myLog);

function attachRemoveListeners() {
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            removeBook(e);
        });
    });
}

attachRemoveListeners();

function removeBook(e) {
    const clickedButton = e.target;
    const removeIndex = clickedButton.getAttribute('data-index');
    const allBooks = document.querySelectorAll('.logged-book');
    allBooks.forEach(book => {
        const bookIndex = book.getAttribute('data-index');
        if (removeIndex === bookIndex) {
            myLog.splice(removeIndex, 1);
        }
    });
    const logContainer = document.querySelector('.log-container');
    logContainer.innerHTML = '';
    generateLog(myLog);
    attachRemoveListeners();
}

function showAddBookForm() {

    // reveal the form & blur the background:

    const mainSection = document.querySelector('.main');
    mainSection.classList.add('blur');
    const addBookFormContainer = document.querySelector('.add-book-form-container');
    addBookFormContainer.classList.remove('hide');
    const addBookForm = document.querySelector('.add-book-form');
    addBookForm.classList.remove('hide');

    // show the user their rating selection value, and automatically hide/refill the placeholder values
    // when form input fields lose or gain focus

    const titleInput = document.querySelector('.title-input');
    titleInput.value = '';
    titleInput.addEventListener('focus', () => {
        titleInput.removeAttribute('placeholder');
    });
    titleInput.addEventListener('blur', () => {
        titleInput.setAttribute('placeholder', 'example: Purity');
    });

    const authorInput = document.querySelector('.author-input');
    authorInput.value = '';
    authorInput.addEventListener('focus', () => {
        authorInput.removeAttribute('placeholder');
    });
    authorInput.addEventListener('blur', () => {
        authorInput.setAttribute('placeholder', 'example: Jonathan Franzen');
    });

    const pagesInput = document.querySelector('.pages-input');
    pagesInput.value = '';
    pagesInput.addEventListener('focus', () => {
        pagesInput.removeAttribute('placeholder');
    });

    pagesInput.addEventListener('blur', () => {
        pagesInput.setAttribute('placeholder', 'example: 563');
    });

    const ratingInput = document.querySelector('.rating-input');

    const ratingSelector = document.querySelector('#rating');
    ratingSelector.value = '';

    function showRatingSelection() {
        const userRating = document.querySelector('.user-rating');
        userRating.textContent = ratingSelector.value; 
    }

    showRatingSelection();

    ratingSelector.addEventListener('change', showRatingSelection);

}

// add a new book to the log when the user clicks submit

const submitForm = document.querySelector('.form-itself');

submitForm.addEventListener('submit', (e) => {
    const titleInput = document.querySelector('.title-input');
    const authorInput = document.querySelector('.author-input');
    const pagesInput = document.querySelector('.pages-input');
    const ratingInput = document.querySelector('.rating-input');
    e.preventDefault();
    closeAddBookForm();
    addNewBook(titleInput.value, authorInput.value, pagesInput.value, parseInt(ratingInput.value));
});

function closeAddBookForm() {
    const mainSection = document.querySelector('.main');
    mainSection.classList.remove('blur');
    const addBookFormContainer = document.querySelector('.add-book-form-container');
    addBookFormContainer.classList.add('hide');
    const addBookForm = document.querySelector('.add-book-form');
    addBookForm.classList.add('hide');
}

function addNewBook(title, author, pages, rating) {
    console.log('addNewBook fired');

    let newBook = new Book(title, author, pages, rating);
    myLog.push(newBook);
    const logContainer = document.querySelector('.log-container');
    logContainer.innerHTML = '';
    generateLog(myLog);
    attachRemoveListeners();
}

