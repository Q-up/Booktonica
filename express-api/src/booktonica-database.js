const pgp = require("pg-promise")();

/**
 * An object that has methods matching useful database queries.
 * Use `this.db` to access a connected pg-promise connection.
 * Make sure to return the promise!
 *
 * For examples of other queries, see
 * [pghttps://github.com/vitaly-t/pg-promise/wiki/Learn-by-Example
 */
class BooktonicaDatabase {
  /**
   * @param {String} name - name of database to connect to
   */
  constructor(name) {
    const connectionString = `postgres://localhost:5432/${name}`;
    console.log("Postgres DB => ", connectionString);
    this.db = pgp(connectionString);
  }

  sanityCheck() {
    console.log("\tTesting database connection...");
    return this.getBooksCount().then(count =>
      console.log(`\t✔️ Found ${count} books.`)
    );
  }

  getBooksCount() {
    return this.db.one("SELECT count(*) FROM books").then(r => r.count);
  }

  getAllGenres() {
    return this.db.any("SELECT DISTINCT genre FROM books");
  }

  getBooksByGenre(genre) {
    return this.db.any("SELECT * FROM books WHERE genre = $1", [genre]);
  }

  getSortedBooksAZ() {}

  getSortedBooksZA() {}

  searchByBook(book) {
    return this.db.any(
      `SELECT
          b.id,
          b.title,
          b.subtitle,
          b.summary,
          b.cover_image_url,
          TO_CHAR(b.publication_date, 'DD Mon YYYY') AS publication_date,
          a.name AS author_name
        FROM books b
        INNER JOIN authors a
                ON a.id = b.author_id
        WHERE lower(b.title) LIKE '%${book}%'
        -- To add search by author name, uncomment:
           -- OR lower(a.name)  LIKE '%${book}%'`
    );
  }

  getAllBooks() {
    return this.db.any(
      `SELECT 
          b.id,
          b.title,
          b.subtitle,
          b.summary,
          b.cover_image_url,
          b.genre,
          TO_CHAR(b.publication_date, 'DD Mon YYYY') AS publication_date,
          a.name AS author_name FROM books b
        INNER JOIN authors a ON a.id = b.author_id
        ORDER BY b.publication_date DESC`
    );
  }
}

module.exports = BooktonicaDatabase;
