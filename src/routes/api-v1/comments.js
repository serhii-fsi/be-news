const app = require("../../app");

app.delete("/api/comments/:comment_id", require("../../controllers/delete-comment"));

app.get("/api/articles/:article_id/comments", require("../../controllers/get-comments"));

app.post("/api/articles/:article_id/comments", require("../../controllers/post-comment"));
