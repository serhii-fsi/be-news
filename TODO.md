# Checklist before requesting a review
- [ ] I have performed a self-review of my code
- [ ] If it is a core feature, I have added thorough tests.


# Task 2 - CORE: GET /api/topics
- [x] Middleware to handle all 404 errors, preventing server hang-ups during the testing of endpoints that do not exist
- [ ] Integration tests for endpoint `GET /api/topics`
- [ ] Integration tests for non-existent endpoint `GET /api/non_existent` returns `404`
- [ ] Implementing controllers, models, etc., and passing tests
- [ ] Model which throws db error for testing purposes
- [ ] Integration test for db error
- [ ] Middleware for db errors
- [ ] Code refactoring


# app.js & middlewares
- Create middlewares for errors
    - [ ] 404 all paths
    - [ ] DB Errors
    - [ ] User errors


# Improvements
- Errors and Logging
    - [ ] Find out how to add logging using SOLID approach to have an ability to change it later.
        Does it necessary at all? 
        Adapter pattern?
    - [ ] Find Log & Error library if necessary
    - [ ] Should find all comments `// ErrorLogging`
