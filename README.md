# Setup

## 1. Create `.env.*` files
- Create `./.env.development` file
    - Add config `PGDATABASE=database_name` with your `database_name`
- Create `./.env.test` file
    - Add config `PGDATABASE=test_database_name` with your `test_database_name`

## 2. Create SQL file
- Create `./src/db/setup.sql` using this template where you need to set your `database_name` and `test_database_name`
```
    DROP DATABASE IF EXISTS test_database_name;
    DROP DATABASE IF EXISTS database_name;

    CREATE DATABASE test_database_name;
    CREATE DATABASE database_name;
```

## 3. Run `npm install`

## 4. Setup databases
- `npm run setup-dbs`

## 5. Seed DB
- `npm run seed`

<br/><br/>

# Contracts
## Api
- Server should return errors wrapped in error object.
    Example `{ error: { status: 404, msg: '404 Not Found' } }`  

<br/><br/>

# Tests style guide
- Use Spotify approach - https://github.com/spotify/should-up

<br/><br/>

# Style guide
(Example: https://google.github.io/styleguide/jsguide.html)

## String literals
- Use `'` for "technical" strings like `.get('/api/treasures')` etc.
- Use `"` for "text" strings which could contain `'` like `test("does't return ...", `

