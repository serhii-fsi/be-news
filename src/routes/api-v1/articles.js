const app = require('../../app');


app.get('/api/articles/:article_id', require('../../controllers/get-article'));

app.get('/api/articles', require('../../controllers/get-articles'));

app.get('/api/articles/:article_id/comments', require('../../controllers/get-article-comments'));
