import {useState} from 'react'

const Header = ({text}) => {
    return <h1>
        {text}
    </h1>
}

const MyButton = (props) => {
    return <button onClick={() => props.function(props.counter + 1)}>{props.text}</button>
}

const StaticLine = ({text, value}) => {
    return <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
}

const Percents = ({data, text}) => {
    if (isNaN(data)) return <tr>
        <td>{text}: </td>
        <td>0%</td>
    </tr>
    return <tr>
        <td>{text}: </td>
        <td> {data}%</td>
    </tr>
}

const Statistics = ({good, neutral, bad}) => {
    const average = (a, b, c) => {
        if (a + b + c === 0) return 0
        return (a - c) / (a + b + c)
    }

    if(good+bad+neutral===0) return <div>No feedback is given</div>

    return <div>
        <Header text="Statistics"/>
        <table>
            <tbody>
            <StaticLine text="good" value={good}/>
            <StaticLine text="neutral" value={neutral}/>
            <StaticLine text="bad" value={bad}/>
            <StaticLine text="average" value={average(good, neutral, bad)}/>
            <Percents text="positive" data={good / (good + neutral + bad)*100}/>
            </tbody>
        </table>
    </div>
}


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)


    return (
        <div>
            <Header text="give feedback"/>
            <MyButton counter={good} function={setGood} text="good"/>
            <MyButton counter={neutral} function={setNeutral} text="neutral"/>
            <MyButton counter={bad} function={setBad} text="bad"/>

            <Statistics good={good} neutral={neutral} bad={bad} />

        </div>
    )
}

export default App
