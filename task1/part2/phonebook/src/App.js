import { useState, useEffect } from 'react'
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import Notification from "./Notification";
import connectService from './services/connect'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState("")
    const [isError, setIsError] = useState(false)



    useEffect(()=> {
        connectService
            .getAll()
            .then(response => {
                setPersons(response.data)
                setMessage(null)
            })
    },[])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()

        const people = persons.map(man => man.name)
        if(people.indexOf(newName)!==-1) {
            const p = persons.find(man => man.name === newName)
            updateNumber(p.id)
        }
        else {
            const person = {
                name: newName,
                number: newPhone,
            }

            connectService.create(person)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewPhone('')
                    setNewName('')

                    setIsError(false)
                    setMessage(
                        `${response.data.name} was successfully added`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
        }
    }

    const updateNumber = (id) => {
        const person = persons.find(n => n.id === id)
        if (window.confirm(`${person.name} is already added to phonebook, replace old number with a new one?`)) {
            const man = {...person, number: newPhone}
            connectService.update(person.id, man)
                .then(returnedPerson => {
                    setPersons(persons.map(p => (p.id !== man.id)? p : returnedPerson.data))
                    setIsError(false)
                    setMessage(
                        `${returnedPerson.data.name} was successfully updated`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                })
                .catch(error => {
                    setIsError(true)
                    setMessage(
                        `${man.name} was already removed from server`
                    )
                    setTimeout(() => {
                        setMessage(null)
                        setIsError(false)
                    }, 5000)
                })
        }
    }

    const deletePerson = (person) => {
        if (window.confirm(`delete ${person.name} ?`))
        connectService.deletePerson(person.id)
            .then(response => {
                setPersons(persons.filter(man => man.id !== person.id))

                setIsError(false)
                setMessage(
                    `${person.name} was successfully deleted`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
            .catch(error => {
                setIsError(true)
                setMessage(
                    `${person.name} was already removed from server`
                )
                setTimeout(() => {
                    setMessage(null)
                    setIsError(false)
                }, 5000)
            })
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} isError={isError}/>
            <Filter handleChange={handleFilterChange}/>
            <h3>Add a new</h3>
            <PersonForm handleNameChange={handleNameChange} handlePhoneChange={handlePhoneChange} addPerson={addPerson}/>
            <h3>Numbers</h3>
            <Persons persons={persons} filter={filter} handleDelete={deletePerson}/>
        </div>
    )
}

export default App