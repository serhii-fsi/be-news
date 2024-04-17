const request = require('supertest');
const app = require('../../../src/app');
const originalEndpoints = require('../../../src/routes/api-v1/endpoints.json');


describe("GET /api", () => {

    test("returns api endpoints", () => {
        return request(app)
            .get('/api')
            .expect(200)
            .then(({ body: { endpoints } }) => {
                expect(endpoints).toMatchObject(originalEndpoints);
            });
    });

});
