const Persons = (props) => {
    return <ul>
        {props.persons.filter(person => person.name
            .toLowerCase()
            .includes(props.filter.toLowerCase()))
        .map((person) =>
            <li key={person.id}>
                {person.name} {person.number}
                <button onClick={() => props.handleDelete(person)}>delete</button>
            </li>)}
    </ul>
}

export default Persons