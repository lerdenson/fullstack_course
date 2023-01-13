import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from "../services/anecdoteService";


const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    updateAnecdote(state, action) {
      const id = action.payload.id
      const newState = state.map(anecdote => anecdote.id === id ? action.payload : anecdote)
      return newState.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const makeVote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.update(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer