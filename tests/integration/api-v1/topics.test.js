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


describe("GET /api/topics", () => {

    test("returns all topics", () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body: { topics } }) => {
                expect(topics).toHaveLength(3);
                topics.forEach(topic => {
                    expect(topic).toMatchObject({
                        description: expect.any(String),
                        slug: expect.any(String)
                    });
                });
            });
    });

    test("the first topic matches the topic from the test data", () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then(({ body: { topics } }) => {
                expect(topics[0]).toMatchObject({
                    description: 'The man, the Mitch, the legend',
                    slug: 'mitch'
                });
            });
    });

});
