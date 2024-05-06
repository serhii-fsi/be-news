const app = require("../../app");

app.get("/api/topics", require("../../controllers/get-topics"));
