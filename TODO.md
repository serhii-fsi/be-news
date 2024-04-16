# Checklist before requesting a review
- [ ] I have performed a self-review of my code
- [ ] If it is a core feature, I have added thorough tests.


# Task 2 - CORE: GET /api/topics
- [!] Middleware to handle all 404 errors, preventing server hang-ups during the testing of endpoints that do not exist
- [ ] Utility class ErrorFinder, designed to identify the source of errors
- [ ] Integration tests for endpoint `GET /api/topics`
- [ ] Integration tests for non-existent endpoint `GET /api/non_existent` returns `404`
- [ ] Implementing controllers, models, etc., and passing tests
- [ ] Model which throws db error for testing purposes
- [ ] Integration test for db error
- [ ] Middleware for db errors
- [ ] Code refactoring


# app.js
- Create middlewares for errors
    - [ ] 404 all paths
    - [ ] DB Errors
    - [ ] User errors

