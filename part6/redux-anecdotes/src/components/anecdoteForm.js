import {useState} from 'react'
import {connect} from "react-redux";
import {createAnecdote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";


const AnecdoteForm = (props) => {
    const [newAnecdote, setNewAnecdote] = useState('')


    const addAnek = async (event) => {
        event.preventDefault()
        props.createAnecdote(newAnecdote)
        props.setNotification(`'${newAnecdote}' created`, 5)
        setNewAnecdote('')
    }


    return (
        <div>
            <h2>create new</h2>
            <form>
                <div><input value={newAnecdote} onChange={(e) => setNewAnecdote(e.target.value)}/></div>
                <button onClick={addAnek}>create</button>
            </form>
        </div>
    )
}

export default connect(
    null,
    { createAnecdote, setNotification }
)(AnecdoteForm)