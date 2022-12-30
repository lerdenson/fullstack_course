const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require("../models/user");
const bcrypt = require("bcrypt");

const api = supertest(app)

const jwt = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzYWVhYTAzYjM5NDQ5NTJhYWU5MDRiYiIsImlhdCI6MTY3MjQwMDk4OX0.lFRb_HLx0RJHHe0NJ3ywFYz9wSuVUELxvUkJC9HCIr'

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('testing GET request', () => {
    test('notes are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('test response body length', async () => {
        const response = await api.get('/api/blogs')
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    }, 100000)

    test('is all ids are existing', async () => {
        const response = await api.get('/api/blogs')
        const ids = response.body.map(blog => blog.id)
        ids.forEach(id => {
            expect(id).toBeDefined()
        })
    }, 100000)
})

describe('testing POST request', () => {
    test('blog can be added', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', jwt)
            .send(helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const newBlogList = await helper.blogsInDb()
        expect(newBlogList).toHaveLength(helper.initialBlogs.length + 1)
        expect(newBlogList[newBlogList.length - 1].title).toBe('v1')
    })

    test('blog likes missing', async () => {
        const blogNoLikes = {
            title: 'x1',
            author: 'x2',
            url: 'x3',
        }
        await api
            .post('/api/blogs')
            .set('Authorization', jwt)
            .send(blogNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const newBlogList = await helper.blogsInDb()
        expect(newBlogList).toHaveLength(helper.initialBlogs.length + 1)
        expect(newBlogList[newBlogList.length - 1].title).toBe('x1')
        expect(newBlogList[newBlogList.length - 1].likes).toBe(0)
    })

    test('blog title missing', async () => {
        const blogNoTitle = {
            author: 'd2',
            url: 'd3',
            likes: 14
        }

        await api
            .post('/api/blogs')
            .set('Authorization', jwt)
            .send(blogNoTitle)
            .expect(400)
    })

    test('blog url missing', async () => {
        const blogNoUrl = {
            title: 's1',
            author: 's2',
            likes: 12
        }

        await api
            .post('/api/blogs')
            .set('Authorization', jwt)
            .send(blogNoUrl)
            .expect(400)
    })
})

describe('test DELETE request', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', jwt)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    }, 100000)
})

describe('test PUT request', () => {
    test('update if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(helper.newBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).toContain(helper.newBlog.title)
    })

    test('update if id is invalid', async () => {
        await api
            .put(`/api/blogs/8`)
            .send(helper.newBlog)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})