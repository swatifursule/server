//routes.test.ts
const request = require('supertest');
const server = require('../src/server.ts');
beforeAll(async () => {
    // do something before anything else runs
    console.log('Jest starting!');
});
// close the server after each test
afterAll(() => {
    //server.close();
    console.log('server closed!');
});
describe('basic  tests', () => {
    test('get home route GET /', async () => {
        const response = await request(server).get('/');
        //console.log("response is ", response);
        expect(response.status).toEqual(200);
        expect(response.text).toContain('Hello World!');
    });
});

describe('image tests', () => {
    test('get all images  GET /images', async () => {
        const response = await request(server).get('/images');
        expect(response.status).toEqual(200);
        expect(response.text).toContain('swati');
    });
});