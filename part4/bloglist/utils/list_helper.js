const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    return blogs.reduce(((sum, cur) => sum + cur.likes), 0)

}

const favoriteBlog = (blogs) => {
    const b = [...blogs]
    return b.length === 0 ? {} : b.sort((b1, b2) => b2.likes - b1.likes)[0]
}

const mostBlogs = (blogs) => {
    const authors = []
    _.toPairs(_.countBy(blogs, 'author'))
        .forEach(author => {
            authors.push({
                author: author[0], blogs: author[1]
            })
        })
    return authors.length === 0 ? {} : authors.sort((a1, a2) => a2.blogs - a1.blogs)[0]
}

const mostLikes = (blogs) => {
    const authors = []
    _.toPairs(_.groupBy(blogs, 'author'))
        .forEach(author => {
            authors.push({author: author[0],
                likes: author[1].reduce(((sum, blog) => sum + blog.likes), 0)
            })
        })
    return authors.length === 0 ? {} : authors.sort((a1, a2) => a2.likes - a1.likes)[0]
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}