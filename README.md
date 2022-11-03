# book-log

i created a simple app to log the books you've read this year and track your annual reading goal

live version: https://seanstephenbrian.github.io/book-log/

the user's logged books are stored in a 'myLog' JS object; each book has several properties:
title, author, # of pages, whether the user has read it or wants to read it, and their
rating (out of 5) if they have read it.

with these basic log functions in place in the javascript, i focused on creating a simple but 
inviting design with a muted color scheme similar to the one from my earlier admin dashboard project.
individual 'cards' for each logged book are added to the page using javascript; the log is then 
styled with CSS grid for a scalable, adjustable page display.

JS functions linked to event listeners change the book card style when the user clicks the 'read' 
or 'want to read' buttons. in the css, i added subtle scaling effects to the clickable elements 
when one hovers over them. listeners also help with client-side form validation in the pop-up 
'add a new book' form.

the final element that i focused on -- which was not in the initial design prompt but seemed like it
would be a fun addition -- is a reading goal progress bar within the header.
as the user adds or removes books to/from their log, a message reading '<code>x%</code> of the way to your goal 
of <code>y</code> books' is automatically updated and a green progress <code>div</code> advances exactly x%
of the way across this part of the header.

UPDATE: i returned to this project to add storage with the localStorage API. i also created a welcome
window that collects the user's name and reading goal (if any) and saves this information to storage
before rendering the page. the user is able to edit their name and reading goal at any time. 
if the user does not enter a reading goal, the progress bar is red if they haven't read any books or
green if they've read even a single book. instead of giving a percentage for their reading goal progress,
the text in the header simply states 'you've read <code>x</code> books this year'.

here's a screenshot of the log with some placeholder content:

<img src="https://raw.githubusercontent.com/seanstephenbrian/book-log/main/img/screenshot.png" alt="screenshot of the book log with placeholder content">