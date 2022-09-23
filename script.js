let myLog = [
    {title: '1984', author: 'George Orwell', pages: 328, rating: 2, review: 'not great'},
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

function Book(title, author, pages, rating, review) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.rating = rating;
    this.review = review;
}

function addBookToLog(title, author, pages, rating, review) {
    let newBook = new Book(title, author, pages, rating, review);
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
}

generateLog(myLog);