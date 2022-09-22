let myLibrary = [
    {title: '1984', author: 'George Orwell', pages: 328, read: 'read'},
    {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', pages: 208, read: 'read'},
    {title: 'Mrs Dalloway', author: 'Virginia Woolf', pages: 194, read: 'read'}
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function generateLibrary(library) {
    const libraryContainer = document.querySelector('.library-container');
    library.forEach(book => {
        const loggedBook = libraryContainer.appendChild(document.createElement('div'));
        loggedBook.classList.add('logged-book');
        for (property in book) {
            const bookProperty = loggedBook.appendChild(document.createElement('div'));
            bookProperty.classList.add(`book-${property}`);
            bookProperty.innerHTML = `<div>${property}:</div><div>${book[property]}</div>`;
        };
    });
}

generateLibrary(myLibrary);