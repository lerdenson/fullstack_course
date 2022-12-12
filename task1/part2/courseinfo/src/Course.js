const Result = (props) => {
    const {parts} = props
    const result = parts.reduce((a, b) => a + b.exercises, 0)
    console.log(result)
    return <div><strong>Total of {result} exercises </strong></div>
}

const Course = (props) => {
    const {course} = props
    return <div key={course.id}>
        <h1>{course.name}</h1>
        <ul>
            {course.parts.map(part =>
                <li key={part.id}>
                    {part.name} {part.exercises}
                </li> )}
        </ul>
        <Result parts={course.parts}/>
    </div>
}

export default Course