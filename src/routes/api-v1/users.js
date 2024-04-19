const app = require('../../app');


app.get('/api/users', require('../../controllers/get-users'));
