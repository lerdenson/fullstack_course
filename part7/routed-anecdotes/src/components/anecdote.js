import { useParams } from 'react-router-dom'

const Anecdote = ({ anecdotes, vote, makeNotification }) => {
    const id = useParams().id
    const anecdote = anecdotes.find(a => a.id === Number(id))

    const handleVote = (event) => {
        event.preventDefault()
        vote(anecdote.id)
        makeNotification(`you voted '${anecdote.content}'`, 5)
    }

    return <div>
        <h3>{anecdote.content}</h3>
        <div>{anecdote.author}</div>
        <div>{anecdote.info}</div>
        <div>
            has {anecdote.votes}
            <button onClick={handleVote}>vote</button>
        </div>
    </div>
}

export default Anecdote