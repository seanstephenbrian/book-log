# book-log
app to log the books you've read this year and track your annual reading goal

live version: https://seanstephenbrian.github.io/book-log/

i created this book log as my first project for the odin project's javascript course.

the user's logged books are stored in a 'myLog' JS object; each book has several properties:
title, author, # of pages, whether the user has read it or wants to read it, and their
rating (out of 5) if they have read it.

with the basic log functions in place, i focused on creating a simple but inviting design,
employing a muted color scheme similar to the one from my earlier admin dashboard project.
individual 'cards' for each logged book are added to the DOM using javascript; the log
is then styled with CSS grid for a scalable, adjustable page display.

JS event listeners change the book card style when the user clicks the 'read' or 'want to read'
buttons and add subtle scaling effects to the clickable elements when one hovers over them.
listeners also help with client-side form validation in the pop-up 'add a new book' form.

the final element that i focused on -- which was not a part of the assignment but seemed like it
would be a fun addition -- is a reading goal progress bar on the right side of the header.
as the user adds or removes books to/from the log, a message reading 'x% of the way to your goal 
of y books' is automatically updated and a green progress <code>div</code> advances exactly x%
of the way across this section of the header.

this project only supports local storage right now, but i plan to return to it to allow the user to
save their log. at that point i will also add a dialog for the user to enter their name and 
annual book goal.

here's a screenshot of the log with some placeholder content:

<img src="https://raw.githubusercontent.com/seanstephenbrian/book-log/main/img/screenshot.png" alt="screenshot of the book log with placeholder content">