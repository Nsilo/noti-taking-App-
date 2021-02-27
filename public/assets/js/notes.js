const util = require("util");
const fs = require("fs");
const { nanoid } = require("nanoid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Note {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  getNotes() {
    return this.read().then((notes) => {
      let parseNotes;
      try {
        parseNotes = [].concat(JSON.parse(notes));
        console.log(parseNotes);
      } catch (error) {
        parseNotes = [];
      }
      return parseNotes;
    });
  }

  addNote(note) {
    const { title, text } = note;
    const newNote = { title, text, id: nanoid() };
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updates) => this.write(updates))
      .then(() => newNote);
  }

  deleteNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filter) => this.write(filter));
  }
}

module.exports = new Note();
