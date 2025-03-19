const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {userRepository} = require("../repositories/userRepository");
const router = express.Router();
const app = express();
const {userAuth} = require('../middleware/auth');
require('dotenv').config();
const {ILike} = require("typeorm");
const {faker} = require("@faker-js/faker");

app.use(bodyParser.json());
app.use(cors());
// route to get users list with authentication in header, we have used userAuth middleware to auth user request
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Fetch the user list with optional filters and pagination.
 *     tags:
 *       - Users
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: true
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         description: Filter by email
 *       - in: query
 *         name: first_name
 *         schema:
 *           type: string
 *         description: Filter by first name
 *       - in: query
 *         name: last_name
 *         schema:
 *           type: string
 *         description: Filter by last name
 *     responses:
 *       200:
 *         description: Successful response with user list
 *       401:
 *         description: Unauthorized - Invalid or missing token
 */
router.get('/users', userAuth, async (req, res) => {
    try {
        let {
            page = 1,
            limit = 15,
            email = '',
            first_name = '',
            last_name = '',
            order_by = 'DESC'
        } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const filterOptions = {};
        if (email) {
            filterOptions['email'] = ILike(`%${email}%`);
        }

        if (first_name) {
            filterOptions['first_name'] = ILike(`%${first_name}%`);
        }

        if (last_name) {
            filterOptions['last_name'] = ILike(`${last_name}`);
        }
        let users = [];
        if (filterOptions) {
            users = await userRepository.find({where: filterOptions, order: {id: order_by}});
        } else {
            users = await userRepository.find({order: {id: order_by}});
        }

        const total = users.length;
        const start = page === 1 ? 0 : (page - 1) * limit;
        const end = page * limit;
        if (total === 0) {
            return res.status(200).json({status: 200, message: "No users found", data: []})
        }

        return res.status(200).json({
            status: 200,
            total: total,
            data: users.slice(start, end),
            page: page,
            per_page: limit
        })
    } catch (e) {
        return res.status(500).json({status: 500, message: e.message})
    }
});

router.post('/user-dummy-data', async (req, res) => {
    // api to setup users dummy data so that i can test
    const dummyUsers = Array.from({length: 20}).map((val) => ({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        organization: faker.company.name(),
        created_on: faker.date.past(),
    }));

    await userRepository.insert(dummyUsers);
    return res.status(200).json({status: 200, message: "Successfully created", data: dummyUsers})
})
module.exports = router;