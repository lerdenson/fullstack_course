import AnecdoteForm from "./components/anecdoteForm";
import AnecdoteList from "./components/anecdoteList";
import Notification from "./components/Notification";
import {initializeAnecdotes} from "./reducers/anecdoteReducer";
import {useEffect} from "react";
import {useDispatch} from "react-redux";


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAnecdotes())
    }, [])

    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification/>
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    )
}

export default App