import React from 'react'

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Content = (props) => {
    return <div>
        <p>
            {props.part1} {props.excersises1}
        </p>
        <p>
            {props.part2} {props.excersises2}
        </p>
        <p>
            {props.part3} {props.excersises3}
        </p>
    </div>
}

const Total = (props) => {
    return <p>
        Number of exercises {props.excersises1 + props.excersises2 + props.excersises3}
    </p>
}

const App = () => {
    //  header
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    //  Content
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content part1={part1} part2={part2} part3={part3} excersises1={exercises1} excersises2={exercises2}
                     excersises3={exercises3}/>
            <Total excersises1={exercises1} excersises2={exercises2} excersises3={exercises3}/>
        </div>
    )
}

export default App
