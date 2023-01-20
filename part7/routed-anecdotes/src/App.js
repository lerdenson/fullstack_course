import { useState } from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Menu from './components/menu'
import About from './components/about'
import AnecdoteForm from './components/anecdoteForm'
import Anecdote from './components/anecdote'
import AnecdoteList from './components/anecdoteList'
import Footer from './components/footer'
import Notification from './components/notification'


const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    const showStyle = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        display: ''
    }

    const hideStyle = {
        display: 'none'
    }

    const defaultNotification = {
        msg: '',
        style: hideStyle
    }

    const [notification, setNotification] = useState(defaultNotification)
    let previousNotification = undefined

    const makeNotification = (msg, seconds) => {
        const ms = seconds * 1000
        clearTimeout(previousNotification)
        const newNotification = { msg: msg, style: showStyle }
        setNotification(newNotification)
        previousNotification = setTimeout(() => setNotification(defaultNotification), ms)

    }

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    // const match = useMatch('/anecdotes/:id')
    // const anecdote = match
    //     ? anecdotes.find(a => a.id === Number(match.params.id))
    //     : null

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu/>
            <Notification notification={notification}/>
            <Routes>
                <Route path="/"
                    element={<AnecdoteList anecdotes={anecdotes}/>}/>
                <Route path="/anecdotes/:id"
                    element={<Anecdote anecdotes={anecdotes} vote={vote} makeNotification={makeNotification}/>}/>
                <Route path="/create"
                    element={<AnecdoteForm addNew={addNew} makeNotification={makeNotification}/>}/>
                <Route path="/about"
                    element={<About/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}

export default App
