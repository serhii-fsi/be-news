const app = require('../../app');


app.get('/api/articles/:article_id', require('../../controllers/get-article'));

app.patch('/api/articles/:article_id', require('../../controllers/patch-article'));

app.get('/api/articles', require('../../controllers/get-articles'));
