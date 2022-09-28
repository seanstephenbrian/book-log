// set custom title

const user = 'hannah';

const readingGoal = 30;

const title = document.querySelector('.log-title');

title.textContent = `${user}'s book log`;

let myLog = [
    {title: 'Book Title', author: 'Book Author', pages: 500, read: 'read', rating: 5},
    {title: 'Book Title', author: 'Book Author', pages: 500, read: 'want-to-read', rating: 5},
    {title: 'Book Title', author: 'Book Author', pages: 500, read: 'want-to-read', rating: 5},
    {title: 'Book Title', author: 'Book Author', pages: 500, read: 'read', rating: 5},
    {title: 'Book Title', author: 'Book Author', pages: 500, read: 'want-to-read', rating: 5},
    {title: 'Book Title', author: 'Book Author', pages: 500, read: 'read', rating: 5},
    {title: 'Book Title', author: 'Book Author', pages: 500, read: 'read', rating: 5}
];

function Book(title, author, pages, read, rating) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.rating = rating;
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
        loggedBook.dataset.index = log.indexOf(book);
        const readStatus = loggedBook.appendChild(document.createElement('div'));
        readStatus.classList.add('read-status');
        const read = readStatus.appendChild(document.createElement('div'));
        read.classList.add('read-button');
        read.textContent = 'read';
        const wantToRead = readStatus.appendChild(document.createElement('div'));
        wantToRead.classList.add('want-to-read-button');
        wantToRead.textContent = 'want to read';

        for (property in book) {
            if (property === 'read') {
                continue;
            }
            const bookProperty = loggedBook.appendChild(document.createElement('div'));
            bookProperty.classList.add(`book-${property}`);
            bookProperty.innerHTML = `<div>${property}:</div><div>${book[property]}</div>`;
        };

        if (book.read === 'read') {
            loggedBook.classList.add('read-book');
            readStatus.dataset.status = 'read';
        } else if (book.read === 'want-to-read') {
            loggedBook.classList.add('want-to-read-book');
            readStatus.dataset.status = 'want-to-read';
        }

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
    attachRemoveListeners();
    attachReadStatusListeners();
    generateProgressBar();
}

function generateProgressBar() {
    const readBooks = parseInt(document.querySelectorAll('.read-book').length);
    const progressBar = document.querySelector('.progress-bar');
    const progressMessage = document.querySelector('.progress-message');
    const percentageRead = parseInt(readBooks / readingGoal * 100);
    if (percentageRead > 100) {
        percentageRead = 100;
    }
    progressBar.setAttribute('style', `width: ${percentageRead}%`);
    progressMessage.textContent = `${percentageRead}% of the way to your goal of ${readingGoal} books`;
}

function attachRemoveListeners() {
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            removeBook(e);
        });
    });
}

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
}

function attachReadStatusListeners() {
    const readButtons = document.querySelectorAll('.read-button');
    readButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            changeReadStatus(e);
        });
    });
    const wantToReadButtons = document.querySelectorAll('.want-to-read-button');
    wantToReadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            changeReadStatus(e);
        });
    });
}

function changeReadStatus(e) {
    const clickedButton = e.target;
    const readStatusDiv = clickedButton.parentNode;
    const clickedBook = readStatusDiv.parentNode;
    const bookIndex = clickedBook.getAttribute('data-index');
    const clickedButtonClass = clickedButton.getAttribute('class');

    if (clickedButtonClass === 'read-button') {
        // readStatusDiv.dataset.status = 'read';
        // clickedBook.classList.remove('want-to-read-book');
        // clickedBook.classList.add('read-book');
        myLog[bookIndex].read = 'read';
    } else if (clickedButtonClass === 'want-to-read-button') {
        // readStatusDiv.dataset.status = 'want-to-read';
        // clickedBook.classList.remove('read-book');
        // clickedBook.classList.add('want-to-read-book');
        myLog[bookIndex].read = 'want-to-read';
    }
    const logContainer = document.querySelector('.log-container');
    logContainer.innerHTML = '';
    generateLog(myLog);
}

function showAddBookForm() {

    document.getElementById('read').checked = true;
    styleRadioOptions();

    showRatingInput();

    // reveal the form & blur the background:

    const mainSection = document.querySelector('.main');
    mainSection.classList.add('blur');
    const addBookFormContainer = document.querySelector('.add-book-form-container');
    addBookFormContainer.classList.remove('hide');
    const addBookForm = document.querySelector('.add-book-form');
    addBookForm.classList.remove('hide');

    // automatically hide/refill the placeholder values when form input fields lose or gain focus,
    // and show the user their rating selection value

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
}

function removeRatingInput() {
    const ratingSection = document.querySelector('.rating-section');
    ratingSection.classList.add('hide');
}

function showRatingInput() {
    const ratingSection = document.querySelector('.rating-section');
    ratingSection.classList.remove('hide');
}

function styleRadioOptions() {
    const radioInputs = document.querySelectorAll('.radio-input');
    radioInputs.forEach(input => {
        if (input.checked) {
            const radioOption = input.parentNode;
            radioOption.classList.add('checked');
        } else if (!input.checked) {
            const radioOption = input.parentNode;
            radioOption.classList.remove('checked');
        }
    });
}

styleRadioOptions();

const radioInputs = document.querySelectorAll('.radio-input');

radioInputs.forEach(input => {
    input.addEventListener('click', styleRadioOptions);
});

function showRatingSelection() {
    const userRating = document.querySelector('.user-rating');
    userRating.textContent = ratingSelector.value; 
}
const ratingSelector = document.querySelector('#rating');
showRatingSelection();
ratingSelector.addEventListener('change', showRatingSelection);


// add a new book to the log when the user clicks submit

const submitForm = document.querySelector('.form-itself');

submitForm.addEventListener('submit', (e) => {
    const titleInput = document.querySelector('.title-input');
    const authorInput = document.querySelector('.author-input');
    const pagesInput = document.querySelector('.pages-input');
    const ratingInput = document.querySelector('.rating-input');
    let readInput;
    if (document.getElementById('read').checked) {
        readInput = 'read';
    } else if (document.getElementById('want-to-read').checked) {
        readInput = 'want-to-read';
    }
    e.preventDefault();
    closeAddBookForm();
    addNewBook(titleInput.value, authorInput.value, pagesInput.value, readInput, parseInt(ratingInput.value));
});

function closeAddBookForm() {
    const mainSection = document.querySelector('.main');
    mainSection.classList.remove('blur');
    const addBookFormContainer = document.querySelector('.add-book-form-container');
    addBookFormContainer.classList.add('hide');
    const addBookForm = document.querySelector('.add-book-form');
    addBookForm.classList.add('hide');
}

function addNewBook(title, author, pages, read, rating) {
    let newBook = new Book(title, author, pages, read, rating);
    myLog.push(newBook);
    const logContainer = document.querySelector('.log-container');
    logContainer.innerHTML = '';
    generateLog(myLog);
    attachRemoveListeners();
}

generateLog(myLog);