const request = require('supertest')
const app = require('../app')
const User = require('../models/userModel')

const userOne = {
    name: 'testUser_1',
    email: 'testemail@email.com',
    password: '1990what!!'
}

beforeEach(() => {
    console.log("BEFORE EACH TEST")
})

test('Should Signup a new User', async () => {
    await request(app).post('/api/user').send({
        name: 'testUser',
        email: 'tester@test.com',
        password: 'password1'
    }).expect(201)
})