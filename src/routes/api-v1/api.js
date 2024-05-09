const app = require("../../app");

app.get("/", require("../../controllers/get-api"));

app.get("/api", require("../../controllers/get-api"));
