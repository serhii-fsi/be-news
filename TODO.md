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


# Task 3 - CORE: GET /api
- [!] Integration tests for endpoint `GET /api`
- Implementing and passing tests
    - [x] Route
    - [x] Controller
    - [x] Passing tests




# Improvements
- [ ] Create 2 errors tables private and public for AppError. Private has more information, 
    public has limited information for clients. Private table could work as a guideline.
- [ ] Create errors table for ModelError to convert ModelErrors to AppErrors.
- [ ] Do we need JSDoc?
- [ ] Custom errors .toString() method to avoid splitting console output for the same error
- [ ] Find Log & Error library if necessary
- [ ] handle-app-errors.js - how can we improve "Critical Error!" part, 
    should we wrap it in AppError and how?

