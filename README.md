# URL-Shortened
✂ shortened any long URL! ✂

[Link](https://github.com/nirle97/URL-Shortened/tree/development)
*to GitHub Repository -*
[Link](https://repl.it/@nirle97/URL-Shortened#public/shortUrl/main.js)
*to replit -*

**<span style="font-variant:small-caps;">About the Program</span>**
This is a microservice to shorten long and messy URLs. 
All the URls are backed up in jsonbin.io server!

just write your long URL and get the short one. 
all your urls will be displayed in the table!

**<span style="font-variant:small-caps;">Special features</span>**

1.  jsonbin.io: Each url that is in a valid basic structure is being saved in the cloud
    with basic information about it:
    - The full original URL.
    - The new Short URL.
    - The date the URL was created. 
    - Number of click on the short URL.

![](https://github.com/nirle97/URL-Shortened/blob/development/readme%20media/add-url.gif)

2.  If the URL is already exists in the database, the user is getting a notification about it, 
    and the server retrieves the short URL and display it anyway in the table of URLs.

![](https://github.com/nirle97/URL-Shortened/blob/development/readme%20media/invalid-and-exists.gif)


3.  Delete Button: the user can delete all the URLs that are backed up in the database in jsonbin server. 
    The user will get a warning alert before he can commit the delete action. 
    if so, all the URLs will be deleted from the table in the client side, and from the database.

![](https://github.com/nirle97/URL-Shortened/blob/development/readme%20media/delete-button.gif)

4. There are 6 tests to check the program correct functionality using jest and supertest:
    - Create new short URL and save it in the database in jsonbin server.
    - Get error for invalid URL structure.
    - Get error for a full URL that was already shorten and display it.
    - Get all the statistics about a certein short URL.
    - Get error for checking statistics about a wrong URL that doesn't exist in the database.
    - After deleting all the tasks - the database should be empty.