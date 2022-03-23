const app = require('../../main')
const supertest = require('supertest')
const mongoose = require('mongoose')
const mongoUrl = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;

describe('app', () => {

  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(mongoUrl);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('POST /users', () => {

    it('should write given data to db and return it!', async () => {
      const response = await supertest(app)
        .post('/users')
        .send({ email: "xxxx123@gmail.com", age: "44", name: "Gleb" });

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    });

  })

});
