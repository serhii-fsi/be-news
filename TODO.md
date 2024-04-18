# Checklist before requesting a review
- [ ] I have performed a self-review of my code
- [ ] If it is a core feature, I have added thorough tests.


# Task 2 - CORE: GET /api/topics
- [x] Middleware to handle all 404 errors, preventing server hang-ups during the testing of endpoints that do not exist
- [x] Integration tests for endpoint `GET /api/topics`
- Implementing route, controller, model, etc., and passing tests for `GET /api/topics`
    - [x] Route
    - [x] Controller
    - [x] Model
    - [x] Passing tests
- Logging
    - [x] Find out how to add logging using SOLID approach to have an ability to change it later.
        - Does it necessary at all?
            Yes, npm has many packages for logging and our own class works like adapter 
            which allow us to try different loggers without touching any other files 
            to avoid conflicts with other PR
- Errors
    - [x] Do we need to implement custom error class?
        Yes, it is good to have separate error class for model and application because these errors 
        are different. App should not know about Model internals in case we need to change DB.
        AppError could be coupled with App because AppError it is a part of business logic.
        In fact we have sort of (MvC) architecture with thing Model and in fact our model it is a DB adapter.
    - [x] AppError
    - [x] ModelError
- [x] Middleware for app errors
- [x] Integration tests for non-existent endpoint `GET /api/non_existent` returns `404`
- [x] Code refactoring
- [x] Add a description of this endpoint


# Task 3 - CORE: GET /api
- [x] Integration tests for endpoint `GET /api`
- Implementing and passing tests
    - [x] Route
    - [x] Controller
    - [x] Passing tests
- [x] Add a description of this endpoint


# Task 4 - CORE: GET /api/articles/:article_id
- Integration tests for endpoint `GET /api/articles/:article_id`
    - [x] Test for correct and valid article_id
    - [x] Test for incorrect but valid article_id
    - [x] Test for invalid article_id
- Implementation
    - [x] Route
    - [x] Controller
    - [x] Model
- [x] Passing tests
- [x] Some error handling improvements
- [x] Jest auto clear console setup
- [ ] Add a description of this endpoint


# Task 5 - CORE: GET /api/articles
- Integration tests for endpoint `GET /api/articles`
    - [x] Returns all articles, checks articles number and fields types
    - [x] Fields of an article with id 1 must be the same
    - [x] Articles should be sorted by date
- Implementation
    - [x] Route
    - [x] Controller
    - [x] Model
- [x] Passing tests
- [x] Add a description of this endpoint


# Task 6 - CORE: GET /api/articles/:article_id/comments
- [x] "Jest-sorted" setup
- Integration tests for endpoint `GET /api/articles/:article_id/comments`
    - [x] Returns all comments for the 1st article with the correct prop types,
        checks comments number
    - [x] Comments should be served with the most recent comments first
    - [x] Fields of the 2nd comment should be the same
    - [x] Returns an empty array for the 2nd article which doesn't have comments 
    - [x] Returns 404 error for incorrect but valid article_id
    - [x] Returns 400 error for invalid article_id 
- Implementation
    - [x] Route
    - [x] Controller
    - [x] Model
- [x] Tests fixes
- [x] Passing tests
- [x] Add a description of this endpoint


# Task 7 - CORE: POST /api/articles/:article_id/comments
- Integration tests for endpoint `POST /api/articles/:article_id/comments`
    - [x] Returns 404 error when article_id is number but does not exist
    - [x] Returns 400 error when article_id not a number
    - [x] Returns 404 error for username which does not exist
    - [x] Returns 400 error for malformed body
    - [x] Returns the posted comment with the correct props types and values
- Implementation
    - [x] Route
    - [x] Controller
    - [x] Model
- [x] Fixed an issue with running parallel Jest scripts
- [x] Passing tests
- [x] Improved error log output
- [x] Add a description of this endpoint


# Bugs
- Psql pg-format timezone bug
    - [ ] Create PoC test
    - [ ] Fix the bug
    - [ ] Uncomment and pass test

# Improvements
- [ ] Avoid duplications, DRY ("fetch-article-existence.js")
- [ ] Create 2 errors tables private and public for AppError. Private has more information, 
    public has limited information for clients. Private table could work as a guideline.
- [ ] Create errors table for ModelError to convert ModelErrors to AppErrors.
    Developer should choose needed error preset from some list or add a new one in the list before.   
- [ ] Do we need JSDoc?
- [ ] Custom errors .toString() method to avoid splitting console output for the same error
- [ ] Find Log & Error library if necessary
- [ ] handle-app-errors.js - how can we improve "Critical Error!" part, 
    should we wrap it in AppError and how?

