const app = require('../../app');


app.get('/api/articles/:article_id', require('../../controllers/get-article'));
