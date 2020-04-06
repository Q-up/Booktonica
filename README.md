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

## Optional Challenges

Add another filter options. They are so many possibilities
Living authors only or dead ones
Filter by publication year - hardcode the last few years or get the distinct years from the DB
Have the search submit automatically when the user stops typing for, say, 200 milliseconds so they don't have to hit the button (or enter)
Have the filters work together at the same time :scream: e.g. if you filter by publication year of 2019 and Genre of YA, it will only show books with BOTH criteria met
