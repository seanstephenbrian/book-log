(function main() {

    // module for creating/updating the book log itself:
    const Log = (function() {

        // create empty log array:
        let myLog = [];

        // get stored log if it exists:
        const retrieveStoredLog = () => {
            if (localStorage.getItem('myLog')) {
                myLog = JSON.parse(localStorage.getItem('myLog'));
            }
        }
        retrieveStoredLog();

        // set up method for saving log to storage:
        const saveLog = () => {
            localStorage.setItem('myLog', JSON.stringify(myLog));
        }

        // initial constructor syntax from before class refactor:

        // function Book(title, author, pages, read, rating) {
        //     this.title = title;
        //     this.author = author;
        //     this.pages = pages;
        //     this.read = read;
        //     this.rating = rating;
        // }

        // new class syntax for book object creation:
        class Book {
            constructor(title, author, pages, read, rating) {
                this.title = title;
                this.author = author;
                this.pages = pages;
                this.read = read;
                this.rating = rating;
            }
        }

        // render the log on the page:
        function generateLog() {
            const logContainer = document.querySelector('.log-container');
            // empty the log container:
            logContainer.innerHTML = '';
            // change the numerical rating to the corresponding number of stars:
            myLog.forEach(book => {
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
                } else if (book.rating === '0') {
                    book.rating = '0/5';
                } else if (book.rating === '') {
                    delete book.rating;
                }
                // create the book card itself:
                const loggedBook = logContainer.appendChild(document.createElement('div'));
                loggedBook.classList.add('logged-book');
                loggedBook.dataset.index = myLog.indexOf(book);

                // create the 'read' button:
                const readStatus = loggedBook.appendChild(document.createElement('div'));
                readStatus.classList.add('read-status');
                const read = readStatus.appendChild(document.createElement('div'));
                read.classList.add('read-button');
                read.textContent = 'read';

                // create the 'want to read' button:
                const wantToRead = readStatus.appendChild(document.createElement('div'));
                wantToRead.classList.add('want-to-read-button');
                wantToRead.textContent = 'want to read';

                // display the properties of the book within the card:
                for (property in book) {
                    if (property === 'read') {
                        continue;
                    }
                    const bookProperty = loggedBook.appendChild(document.createElement('div'));
                    bookProperty.classList.add(`book-${property}`);
                    bookProperty.innerHTML = `<div>${property}:</div><div>${book[property]}</div>`;
                };

                // add 'data-status' attribute to the card to mark whether it is 'read' or 'want-to-read'
                if (book.read === 'read') {
                    loggedBook.classList.add('read-book');
                    readStatus.dataset.status = 'read';
                } else if (book.read === 'want-to-read') {
                    loggedBook.classList.add('want-to-read-book');
                    readStatus.dataset.status = 'want-to-read';
                }

                // add a remove button to the book card:
                const removeBook = loggedBook.appendChild(document.createElement('div'));
                removeBook.classList.add('remove-book');
                const removeButton = removeBook.appendChild(document.createElement('div'));
                removeButton.classList.add('remove-button');
                removeButton.dataset.index = myLog.indexOf(book);
                removeButton.textContent = `remove book`;
            });

            // add a single card at the end of the log to allow user to add a new book:
            const addBook = logContainer.appendChild(document.createElement('div'));
            addBook.classList.add('add-book');
            // its only content is a plus-sign svg:
            addBook.innerHTML = `<img src='img/svg/add.svg' alt='Add a new book'>`;
            // attach click listener to the add book card which reveals the add book form:
            addBook.addEventListener('click', () => {
                Page.showAddBookForm();
            });
            // attach click listeners to the new log and update the header progress bar:
            Page.attachLogListeners();
            Page.updateProgressBar();

        };

        // function to add a book to the log, save the new log to storage, and then re-render the log display:
        function addNewBook(title, author, pages, read, rating) {
            let filteredRating = rating;
            if (read === 'want-to-read') {
                filteredRating = '';
            }
            let newBook = new Book(title, author, pages, read, filteredRating);
            myLog.push(newBook);
            saveLog();
            generateLog();
        }

        // function to remove a book from the log object, save the new log to storage, and then re-render the log display:
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
            saveLog();
            generateLog();
        }

        // function to change read status of a book in the log, save the new log to storage, and then re-render the log:
        function changeReadStatus(e) {
            const clickedButton = e.target;
            const readStatusDiv = clickedButton.parentNode;
            const clickedBook = readStatusDiv.parentNode;
            const bookIndex = clickedBook.getAttribute('data-index');
            const clickedButtonClass = clickedButton.getAttribute('class');

            if (clickedButtonClass === 'read-button') {
                myLog[bookIndex].read = 'read';
            } else if (clickedButtonClass === 'want-to-read-button') {
                myLog[bookIndex].read = 'want-to-read';
            }
            saveLog();
            generateLog();
        }

        return {
            generateLog,
            addNewBook,
            removeBook,
            changeReadStatus
        }

    })();


    // module for everything page-related:
    const Page = (function() {

        // initialize empty variable for user's name:
        let user;

        // method to set and save user's name:
        const setUser = (name) => {
            user = name;
            localStorage.setItem('user', user);
        }

        // initialize empty variable for user's reading goal:
        let readingGoal;

        // method to set and save user's reading goal:
        const setReadingGoal = (goal) => {
            readingGoal = goal;
            localStorage.setItem('readingGoal', readingGoal);
        }

        // render a welcome pop-up to gather user's name and reading goal:
        const showWelcomeWindow = () => {

            // create welcome message <div>:
            const welcomeWindow = document.createElement('div');
            welcomeWindow.classList.add('welcome-window');
            document.body.appendChild(welcomeWindow);

                // add welcome message before form:
                const welcomeMessage = document.createElement('div');
                welcomeMessage.classList.add('welcome-message');
                welcomeMessage.textContent = 'hello! please provide your name and annual reading goal.';
                welcomeWindow.appendChild(welcomeMessage);

                // create welcome form to gather user's name and reading goal:
                const welcomeForm = document.createElement('form');
                welcomeForm.classList.add('welcome-form');
                welcomeForm.setAttribute('action', '');
                welcomeForm.setAttribute('novalidate', '');
                welcomeForm.setAttribute('method', 'post');
                welcomeWindow.appendChild(welcomeForm);

                    // create name section:
                    const nameSection = document.createElement('div');
                    nameSection.classList.add('name-section');
                    welcomeForm.appendChild(nameSection);

                        // create name label & input:
                        const nameLabel = document.createElement('label');
                        nameLabel.classList.add('name-label');
                        nameLabel.setAttribute('for', 'name');
                        nameLabel.textContent = 'name:'
                        nameSection.appendChild(nameLabel);

                        const nameInput = document.createElement('input');
                        nameInput.classList.add('name-input');
                        nameInput.setAttribute('type', 'text');
                        nameInput.setAttribute('name', 'name');
                        nameInput.setAttribute('id', 'name');
                        nameInput.setAttribute('required', '');
                        nameInput.setAttribute('placeholder', 'example: Helen');
                        nameInput.setAttribute('minlength', '2');
                        nameSection.appendChild(nameInput);

                        // add event listener for name input:
                        nameInput.addEventListener('input', validateName);

                        const nameError = document.createElement('div');
                        nameError.classList.add('name-error');
                        nameSection.appendChild(nameError);

                    // create reading goal section:
                    const goalSection = document.createElement('div');
                    goalSection.classList.add('goal-section');
                    welcomeForm.appendChild(goalSection);

                        // create goal label & input:
                        const goalLabel = document.createElement('label');
                        goalLabel.classList.add('goal-label');
                        goalLabel.setAttribute('for', 'goal');
                        goalLabel.textContent = 'how many books do you want to read this year?';
                        goalSection.appendChild(goalLabel);

                        const goalInput = document.createElement('input');
                        goalInput.classList.add('goal-input');
                        goalInput.setAttribute('type', 'number');
                        goalInput.setAttribute('name', 'goal');
                        goalInput.setAttribute('id', 'goal');
                        goalInput.setAttribute('placeholder', 'example: 15');
                        goalInput.setAttribute('min', '1');
                        goalSection.appendChild(goalInput);

                        // add event listener for goal input:
                        goalInput.addEventListener('input', validateGoal);

                        const goalError = document.createElement('div');
                        goalError.classList.add('goal-error');
                        goalSection.appendChild(goalError);

                    // create submit button:
                    const buttonContainer = document.createElement('div');
                    buttonContainer.classList.add('welcome-form-button-container');
                    welcomeForm.appendChild(buttonContainer);

                        const submitButton = document.createElement('button');
                        submitButton.classList.add('welcome-form-button');
                        submitButton.setAttribute('type', 'submit');
                        submitButton.textContent = 'submit';
                        buttonContainer.appendChild(submitButton);

                // add event listener for form submission:
                welcomeForm.addEventListener('submit', validateForm);

            // blur the background:
            const mainSection = document.querySelector('.main');
            mainSection.classList.add('blur');
        }

        // validation for name input in welcome form:
        function validateName () {
            const error = document.querySelector('.name-error');
            const nameInput = document.querySelector('.name-input');
            if (nameInput.validity.valueMissing) {
                error.textContent = 'please enter your name.'
            }
            else if (nameInput.validity.tooShort) {
                error.textContent = 'your name must be at least 2 characters long';
            } else {
                error.textContent = '';
            }
        }

        // validation for goal input field in welcome form:
        function validateGoal () {
            const error = document.querySelector('.goal-error');
            const goalInput = document.querySelector('.goal-input');
            if (goalInput.validity.rangeUnderflow) {
                error.textContent = 'if you set a goal, it must be a number greater than 0'
            } else {
                error.textContent = '';
            }
        }

        // validation for form submit:
        function validateForm (event) {
            const form = document.querySelector('.welcome-form');
            const nameInput = document.querySelector('.name-input');
            const goalInput = document.querySelector('.goal-input');
            if (form.checkValidity()) {
                submitWelcomeForm(event);
            } 
            else if (!form.checkValidity()) {
                event.preventDefault();
                const nameError = document.querySelector('.name-error');
                if (!nameInput.validity.valid) {
                    nameError.textContent = 'your name must be at least 2 characters long';
                } else {
                    nameError.textContent = '';
                }
                const goalError = document.querySelector('.goal-error');
                if (!goalInput.validity.valid) {
                    goalError.textContent = 'if you set a goal, it must be a number greater than 0';
                } else {
                    goalError.textContent = '';
                }
            }
        }

        // set user and readingGoal variables based on input from the submitted form:
        const submitWelcomeForm = (event) => {
            event.preventDefault();
            const nameInput = document.querySelector('.name-input').value;
            setUser(nameInput);
            const goalInput = document.querySelector('.goal-input').value;
            setReadingGoal(goalInput);
            renderPageTitle();
            updateProgressBar();
            hideWelcomeWindow();
        }

        // remove the welcome window from the document:
        const hideWelcomeWindow = () => {
            // delete window:
            const welcomeWindow = document.querySelector('.welcome-window');
            welcomeWindow.remove();

            // un-blur the background:
            const mainSection = document.querySelector('.main');
            mainSection.classList.remove('blur');
        }

        // set the page title with the user's name:
        const renderPageTitle = () => {
            const title = document.querySelector('.title-text');
            title.textContent = `${user}'s book log`;

        }
        
        // generate progress bar with user's reading goal:
        function updateProgressBar() {
            const readBooks = parseInt(document.querySelectorAll('.read-book').length);
            const progressBar = document.querySelector('.progress-bar');
            const progressMessage = document.querySelector('.progress-message');
            if (readingGoal) {
                const percentageRead = parseInt(readBooks / readingGoal * 100);
                if (percentageRead > 100) {
                    percentageRead = 100;
                }
                progressBar.setAttribute('style', `width: ${percentageRead}%`);
                progressMessage.textContent = `${percentageRead}% of the way to your goal of ${readingGoal} books`;
            } else {
                if (readBooks === 0) {
                    progressBar.setAttribute('style', `width: 0`);
                } else {
                    progressBar.setAttribute('style', `width: 100%`);
                }
                if (readBooks === 1) {
                    progressMessage.textContent = `you've read ${readBooks} book this year`;
                } else {
                    progressMessage.textContent = `you've read ${readBooks} books this year`;
                }
            }
            

        }

        // check if user & readingGoal are saved in localStorage; if not, show the welcome pop-up:
        if (localStorage.getItem('user')) {
            user = localStorage.getItem('user');
            readingGoal = localStorage.getItem('readingGoal');
            renderPageTitle();
            updateProgressBar();
        } else if (!localStorage.getItem('user')) {
            showWelcomeWindow();
        }

        function attachLogListeners() {

            // attach click listeners for remove buttons:
            const removeButtons = document.querySelectorAll('.remove-button');
            removeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    Log.removeBook(e);
                });
            });

            // attach click listeners for 'read' buttons:
            const readButtons = document.querySelectorAll('.read-button');
            readButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    Log.changeReadStatus(e);
                });
            });

            // attach click listeners for 'want to read' buttons:
            const wantToReadButtons = document.querySelectorAll('.want-to-read-button');
            wantToReadButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    Log.changeReadStatus(e);
                });
            });
        }

        const addEditListeners = () => {
            const editName = document.querySelector('.edit-name');
            editName.addEventListener('click', renderEditForm);

            const editGoal = document.querySelector('.edit-goal');
            editGoal.addEventListener('click', renderEditForm);
        }

        const renderEditForm = () => {

            // use the same pop-up as the welcome window:
            showWelcomeWindow();

            const welcomeWindow = document.querySelector('.welcome-window');
            welcomeWindow.classList.add('edit-window');

            // change the message:
            const welcomeMessage = document.querySelector('.welcome-message');
            welcomeMessage.textContent = 'edit your name / reading goal below:';
            welcomeMessage.classList.add('edit-form-title');

            // load the user's name into the name input field:
            const nameInput = document.querySelector('.name-input');
            nameInput.value = user;

            // and load their reading goal into the goal input field:
            const goalInput = document.querySelector('.goal-input');
            goalInput.value = readingGoal;

            // add a close button in case the user wishes to exit without changing their name or goal:
            const closeFormButton = document.createElement('img');
            closeFormButton.classList.add('close-form-button', 'close-edit-form-button');
            closeFormButton.setAttribute('src', 'img/svg/close.svg');
            closeFormButton.setAttribute('alt', 'Close the form');
            welcomeMessage.appendChild(closeFormButton);

            // add a click listener to the close button:
            closeFormButton.addEventListener('click', hideWelcomeWindow);

        }

        function showAddBookForm() {
            // initial settings for the form to look right:
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
        }

        function closeAddBookForm() {
            const mainSection = document.querySelector('.main');
            mainSection.classList.remove('blur');
            const addBookFormContainer = document.querySelector('.add-book-form-container');
            addBookFormContainer.classList.add('hide');
            const addBookForm = document.querySelector('.add-book-form');
            addBookForm.classList.add('hide');
        }

        function attachFormListeners() {

            // automatically hide/refill the placeholder values when form input fields gain or lose focus:
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

            // re-style the radio options if either option is clicked:
            const radioInputs = document.querySelectorAll('.radio-input');
            radioInputs.forEach(input => {
                input.addEventListener('click', styleRadioOptions);
            });

            // add listeners to show/remove the rating input field depending on if the book has been read:
            const readOption = document.querySelector('.read-option');
            readOption.addEventListener('click', () => {
                showRatingInput();
            });
            const wantToReadOption = document.querySelector('.want-to-read-option');
            wantToReadOption.addEventListener('click', () => {
                removeRatingInput();
            });

            // render the rating selection if the value of the slider changes:
            function showRatingSelection() {
                const userRating = document.querySelector('.user-rating');
                userRating.textContent = ratingSelector.value; 
            }
            const ratingSelector = document.querySelector('#rating');
            showRatingSelection();
            ratingSelector.addEventListener('change', showRatingSelection);

            // add a click listener for the close form button:
            const closeFormButton = document.querySelector('.close-form-button');
            closeFormButton.addEventListener('click', () => {
                closeAddBookForm();
            });

            // add a new book to the log when the user clicks submit:
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
                Log.addNewBook(titleInput.value, authorInput.value, pagesInput.value, readInput, parseInt(ratingInput.value));
            });
        }

        // check if radio options are checked and style them accordingly:
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

        // initial styling of radio options:
        styleRadioOptions();

        // functions to show or hide the rating input field:
        function showRatingInput() {
            const ratingSection = document.querySelector('.rating-section');
            ratingSection.classList.remove('hide');
        }
        function removeRatingInput() {
            const ratingSection = document.querySelector('.rating-section');
            ratingSection.classList.add('hide');
        }

        return {
            updateProgressBar,
            attachLogListeners,
            attachFormListeners,
            showAddBookForm,
            addEditListeners
        }

    })();

    Log.generateLog();
    Page.attachFormListeners();
    Page.addEditListeners();

})();