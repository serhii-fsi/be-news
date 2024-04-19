const db = require('../../../src/db/connection');
const app = require('../../../src/app');
const request = require('supertest');
const seed = require('../../../src/db/seeds/seed');
const testData = require('../../../src/db/data/test-data/index');


beforeEach(() => {
    return seed(testData);
});

afterAll(() => {
    return db.end();
});


describe("GET /api/users", () => {

    test("responds with 200 and all users with correct props", () => {
        return request(app)
            .get('/api/users')
            .expect(200)
            .then(({ body: { users } }) => {
                expect(users).toHaveLength(4);
                const { userData } = testData;
                users.forEach(user => {
                    const userFromData = userData.find(u => u.username === user.username);
                    expect(user).toMatchObject({
                        username: userFromData.username,
                        name: userFromData.name,
                        avatar_url: userFromData.avatar_url,
                    });
                });
            });
    });

});