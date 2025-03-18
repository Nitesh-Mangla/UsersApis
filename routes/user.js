const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {userRepository} = require("../repositories/userRepository");
const router = express.Router();
const app = express();
const {userAuth} = require('../middleware/auth');
require('dotenv').config();
const {Like} = require("typeorm");
const {faker} = require("@faker-js/faker");

app.use(bodyParser.json());
app.use(cors());

router.get('/users', userAuth, async (req, res) => {
    let {page = 1, limit = 15, email = '', first_name = '', last_name = ''} = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const filterOptions = {};
    if (email) {
        filterOptions['email'] = Like(`%${email}%`);
    }

    if (first_name) {
        filterOptions['first_name'] = Like(`%${first_name}%`);
    }

    if (last_name) {
        filterOptions['last_name'] = Like(`${last_name}`);
    }
    let users = [];
    if (filterOptions) {
        users = await userRepository.find({where: filterOptions});
    } else {
        users = await userRepository.find();
    }

    const total = users.length;
    if (total === 0) {
        return res.status(200).json({status: 200, message: "No users found", data: []})
    }
    const start = page === 1 ? 0 : (page - 1) * limit;
    const end = page * limit;

    return res.status(200).json({status: 200, total: total, data: users.slice(start, end), page: page, per_page: limit})
});

router.post('/user-dummy-data', async (req, res) => {
    const dummyUsers = Array.from({length: 20}).map((val) => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        organization: faker.company.name(),
        created_on: faker.date.past(), // Random past date
    }));

    await userRepository.insert(dummyUsers);
    return res.status(200).json({status: 200, message: "Successfully created", data: dummyUsers})
})
module.exports = router;