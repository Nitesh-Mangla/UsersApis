const { AppDataSource } = require("../data-source");
const { User } = require("../entities/User");

const userRepository = AppDataSource.getRepository(User);

module.exports = { userRepository };
