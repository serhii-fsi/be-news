const fetchUsers = require("../models/fetch-users");

const getUsers = async (req, res, next) => {
    try {
        const users = await fetchUsers();
        res.status(200).send({ users });
    } catch (error) {
        next(error);
    }
};

module.exports = getUsers;
