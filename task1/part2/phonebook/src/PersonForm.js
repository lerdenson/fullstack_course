const PersonForm = (props) => {
    return <form onSubmit={props.addPerson}>
        <div>
            name: <input onChange={props.handleNameChange}/>
        </div>
        <div>
            phone: <input onChange={props.handlePhoneChange}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
}

export default PersonForm