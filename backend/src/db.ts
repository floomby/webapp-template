import sqlite3 from "sqlite3";

export type Entry = {
  content: string;
};

const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the database.");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY,
      content TEXT NOT NULL
    )
  `);
});

export const writeEntry = (entry: Entry) => {
  db.run(
    `INSERT INTO entries(content) VALUES(?)`,
    [entry.content],
    function (err) {
      if (err) {
        return console.error(err.message);
      }
    }
  );
};
