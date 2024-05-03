const app = require('./src/app');

const port = process.env.PORT || 9090;

const server = app.listen(port, () => {
    console.log(`Server is started on port: ${port}`);
});

module.exports = server;