import {connect} from "react-redux";
import {makeVote} from "../reducers/anecdoteReducer";
import {setNotification} from "../reducers/notificationReducer";
import Filter from "./filter";

const AnecdoteList = (props) => {

    const vote = (anecdote) => {
        console.log('vote', anecdote.id)
        props.makeVote(anecdote)
        props.setNotification(`you voted '${anecdote.content}'`, 5)
    }

    return (
        <div>
            <Filter/>
            {props.anecdotes
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: (state.anecdotes.filter(anecdote => anecdote.content
            .toLowerCase()
            .includes(state.filter.toLowerCase())))
    }

}

const mapDispatchToProps = {
    makeVote,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
