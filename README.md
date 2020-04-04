## Final App Assessment

### Setup Instructions

- `createdb booktonica`
- `psql booktonica < booktonica.sql`
- `cd express-api`
- `npm install`
- `npm start`
- `cd ../react-app`
- `npm install`
- `npm start`

## Requirements

- Add a new DB column to store the name of the book's primary genre
- Add more books - having more will help with this feature
- Add a search/filter box at the top of the page under the existing header

### Filtering / Sorting Toolbar (with 4 Widgets)

These filters do not have to work at the same time (that is a challenge below). When a user chooses a filter, it can just "take over" as the only filter. Same goes for sorting. If you are sorting and choose a filter, it's okay if the sorting resets to the default.

### Widget No.1 - Genre Filter | status: needs API endpoint

Add a dropdown to filter by genre (at first, you can just hardcode a few genres)
After it's working, commit and then get the items in the genre search dropdown from the database
Add a new API endpoint that can give you all the distinct genres in the books table

### Widget No. 2 - Sorting Radio Buttons

Add a radio button to sort by newest publication date, oldest publication date, or title (A-Z). Newest pub date should be the starting sort.

### Widget No. 3 - Reset Filters | status: done

Add a button to reset all the filters and return the view to what it was when loading the page

### Widget No. 4 Search Box

I suggest to implement after everything else is working since it's the most complicated.

Add a search text box with submit button. When submitting a search, you should only show books where the title includes the word(s) searched for. E.g. if you type "dog" it should match "Dog Walkers Guide" and "A Dog Day Afternoon." In formal terms, it's a case insensitive substring match.

End of required features.

## Optional Challenges

Add another filter options. They are so many possibilities
Living authors only or dead ones
Filter by publication year - hardcode the last few years or get the distinct years from the DB
Have the search submit automatically when the user stops typing for, say, 200 milliseconds so they don't have to hit the button (or enter)
Have the filters work together at the same time :scream: e.g. if you filter by publication year of 2019 and Genre of YA, it will only show books with BOTH criteria met
