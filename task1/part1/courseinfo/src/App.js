import React from 'react'

const Header = (props) => {
    return <h1>{props.course}</h1>
}

const Part = (props) => {
    return <p>{props.part} {props.exersises}</p>
}

const Content = (props) => {
    return <div>
        <Part part={props.part1} exersises={props.exersises1} />
        <Part part={props.part2} exersises={props.exersises2} />
        <Part part={props.part3} exersises={props.exersises3} />
    </div>
}

const Total = (props) => {
    return <p>
        Number of exercises {props.exersises1 + props.exersises2 + props.exersises3}
    </p>
}

const App = () => {
    //  header
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content part1={part1} part2={part2} part3={part3} exersises1={exercises1} exersises2={exercises2}
                     exersises3={exercises3}/>
            <Total exersises1={exercises1} exersises2={exercises2} exersises3={exercises3}/>
        </div>
    )
}

export default App
