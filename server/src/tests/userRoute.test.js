require('dotenv').config();
const request = require('supertest')
const app = require('../app')
// require('../db/postgresql')
const User = require('../models/userModel')
const BlogPost = require('../models/blogModel')
// require('dotenv').config();

describe('login users', () => {
    const sessionUser = {
        name: 'testUser',
        email: 'tester@test.com',
        password: 'password1'
    }
    let createdTestUser
    let sessionPost 
    let otherUserPost
    
    const agent = request.agent(app);

    beforeAll(async () => {
        // await User.destroy({ where: {} }) //uncomment later
        await agent.post('/api/user')
        .send(sessionUser)
        .then((res) => {
            createdTestUser = res.body
        })
        const otherUser = await User.build({
            name: 'other User',
            email: 'otheremail@gmail.com',
            password: 'testpass!!'
        }).save()
        const bulkPosts = await BlogPost.bulkCreate([{
            title: 'title',
            content: 'test Content',
            UserId: createdTestUser.id
        }, {
            title: 'other user Titles',
            content: 'other test content',
            UserId: otherUser.id
        }], {returning: true})
      
        sessionPost = bulkPosts[0].dataValues
        otherUserPost= bulkPosts[1].dataValues
    })

    it('should get all posts', async () => {
        await request(app)
        .get('/api/blogpost')
        .send()
        .expect(200)
    })

    it('should get individual posts', async () => {
        await request(app)
        .get(`/api/blogpost/${sessionPost.id}`)
        .send()
        .expect(200)
    })

    it('Should let user post article', async () => {
        const blogpost = {
            title: 'title',
            content: 'test Content',
            UserId: createdTestUser.id
        }
        await agent
            .post('/api/blogpost')
            .send(blogpost)
            .expect(201)
    })

    //can't access if no session
    // it('Should not let users post article if no session', async () => {
    //     const blogpost = {
    //         title: 'title 3',
    //         content: 'test Content4',
    //         UserId: createdTestUser.id

    //     }
    //     await request(app) //doesn't use session
    //         .post('/api/blogpost')
    //         .send(blogpost)
    //         .expect(401)
    // })

    describe('logged In users', () => {
        let testPost
        beforeEach( async () => {
            testPostRaw = await BlogPost.build({
                title: 'title',
                content: 'test Content',
                UserId: createdTestUser.id
            }).save()
            testPost = testPostRaw.dataValues
        })
    
        test('can delete their posts', async () => {
            await agent.delete(`/api/blogpost/${testPost.id}`)
                .send()
                .expect(200)
        })
    
        it('can patch their posts', async () => {
            await agent.patch(`/api/blogpost/${testPost.id}`)
                .send({
                    title: 'patched title',
                })
                .expect(200)
        })

        it('cannot delete other users\'s blog posts', async () => {
            await agent.delete(`/api/blogpost/${otherUserPost.id}`)
                .send()
                .expect(404)
        })

        it('cannot patch other user\'s posts', async () => {
            await agent.patch(`/api/blogpost/${otherUserPost.id}`)
                .send({
                    title: 'patched title',
                })
                .expect(404)
        })

    })

})