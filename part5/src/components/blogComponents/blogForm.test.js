import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import BlogForm from './blogForm'

test('form calls the event handler it received as props with the right details', async () => {
    const createBlog = jest.fn()
    const n = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm addBlog={createBlog} showNotification={n}/>)

    const inputs = screen.getAllByRole('textbox')
    const createButton = screen.getByText('create')

    await user.type(inputs[0], 'best article')
    await user.type(inputs[1], 'John')
    await user.type(inputs[2], 'http')

    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('best article')
    expect(createBlog.mock.calls[0][0].author).toBe('John')
    expect(createBlog.mock.calls[0][0].url).toBe('http')
})