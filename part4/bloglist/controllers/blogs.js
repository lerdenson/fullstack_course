const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const {request, response} = require("express")
const User = require("../models/user")
const jwt = require('jsonwebtoken')
const middleware = require("../utils/middleware");


// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const user = request.user


    if (!(request.body.title && request.body.url)) {
        response.status(400).end()
    }

    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes ? request.body.likes : 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const user = request.user

    if (user.blogs.indexOf(request.params.id)===-1) {
        response.status(400).json({
            error: 'this blog does not belong to the current user'
        })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(result)
})

module.exports = blogsRouter