import { useNavigate } from 'react-router-dom'
import useField from '../hooks'

const AnecdoteForm = (props) => {
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')


    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.fields.value,
            author: author.fields.value,
            info: info.fields.value,
            votes: 0
        })
        props.makeNotification(`'${content.fields.value}' created`, 5)
        navigate('/')
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.onReset()
        author.onReset()
        info.onReset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div>
                    content
                    <input {...content.fields}/>
                </div>
                <div>
                    author
                    <input {...author.fields}/>
                </div>
                <div>
                    url for more info
                    <input {...info.fields}/>
                </div>
                <button type='submit'>create</button>
                <button type='reset'>reset</button>
            </form>
        </div>
    )
}

export default AnecdoteForm