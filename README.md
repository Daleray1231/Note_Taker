# Simple Note-taking App

This is a simple note-taking application built with Node.js and Express.

## Usage

### Running Locally
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Start the server with `node app.js`.
4. Access the application at [http://localhost:3001](http://localhost:3001).

### Using Deployed Heroku Link
You can also access the deployed version of this app on Heroku: [Note App](https://afternoon-retreat-83951-636456bea0a3.herokuapp.com)

## Features
- View and add notes.
- Delete specific notes by ID.

## Dependencies
- Express
- uuid

## Application Structure

### `app.js`
This file contains the main server setup and API endpoints for handling notes.

### `public/`
Folder containing static assets:
- `index.html`: Landing page.
- `notes.html`: Page to view and add notes.

### `db/db.json`
JSON file used to store notes.

## API Endpoints

### `GET /notes`
Serves `notes.html` to view and add notes.

### `GET /api/notes`
Retrieves all notes as JSON.

### `POST /api/notes`
Adds a new note.

### `DELETE /api/notes/:id`
Deletes a specific note by ID.
## Notes

- The project contains both the frontend HTML/CSS and backend Node.js code.
- File handling is done to store notes persistently in the `db.json` file.

## Credits

This application was built as part of a learning experience using Express.js and file system handling in Node.js.

[Github Repo](https://github.com/Daleray1231/Note_Taker)   
[Heroku Deployed Application](https://afternoon-retreat-83951-636456bea0a3.herokuapp.com)

![Alt text](Untitled.png)