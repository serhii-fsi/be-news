const app = require('../../app');


app.delete('/api/comments/:comment_id', require('../../controllers/delete-comment'));
