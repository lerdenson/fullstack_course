import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


describe('Blog component', () => {
    let container


    beforeEach(() => {
        const blog = {
            author: 'Jon',
            title: 'best title',
            url: 'http://abrbabr',
            likes: 37,
            user: {
                username: 'vim',
                name: 'viktor'
            }
        }

        container = render(<Blog blog={blog}/>).container
    })

    test('has author name and title', async () => {
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent('Jon')
        expect(div).toHaveTextContent('best title')
    })

    test('at start the info is not displayed', () => {
        const div = container.querySelector('.blogInfo')
        expect(div).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('.blogInfo')
        expect(div).not.toHaveStyle('display: none')
    })
})

describe('testing buttons', () => {
    const blog = {
        author: 'Jon',
        title: 'best title',
        url: 'http://abrbabr',
        likes: 37,
        user: {
            username: 'vim',
            name: 'viktor'
        }
    }
    test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
        const mockHandler = jest.fn()

        render(<Blog blog={blog} updateBlog={mockHandler}/>)

        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)



    })
})