import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({newFilter, handleFilterChange}) => 
  <form>
  <div>
    filter shown with<input
          value={newFilter}
          onChange={handleFilterChange}
          />
  </div>
  </form>

const PersonForm = ({addNameNumber, newName, handleNameChange, newNumber, handleNumberChange}) => 
  <form onSubmit={addNameNumber}>
  <div>
    name: <input
          value={newName}
          onChange={handleNameChange}
          />
  </div>
  <div>number: <input
          value={newNumber}
          onChange={handleNumberChange}
          />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
  </form>

const Persons = ({newFilter, persons, deletePerson}) => {
  const cur_persons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  return (
    <div>
    {cur_persons.map(person => <p key={person.id}> {person.name} {person.number}  <button onClick={() => deletePerson(person.id)}>delete</button> </p> )}
    </div>
    )
}

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={type}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const hook = () => {
      personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  
  useEffect(hook, [])
  
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const addNameNumber = (event) => {
    event.preventDefault()
    const cur_names = persons.map(person => person.name)

    if (cur_names.includes(newName)) {
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one?')) {
        const thatPerson = persons.find(n => n.name === newName)
        const changedPerson = { ...thatPerson, number: newNumber}
        personService
        .update(thatPerson.id, changedPerson)
        .then(returnedP => {
          setPersons(persons.map(p => p.name !== newName ? p : returnedP)) 
          setNewName('')
          setNewNumber('')
          setMessage(`Updated ${newName}`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
        })
        .catch(error => {
          setMessage(
            `Person '${newName}' was already removed from server`
          )
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
            setMessageType(null)
          }, 5000)
          setPersons(persons.filter(n => n.name !== newName))
        })

      }
    }
    else{
      const nameObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(nameObject)
      .then(returnedP => {
        setPersons(persons.concat(returnedP))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}.`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
      })
    }   
  }

  const deletePerson = id => {
    const TargetedP = persons.find(n => n.id === id)
    console.log(TargetedP)
    if (window.confirm(`Delete ${TargetedP.name}`)) {
      //deleteHandler(id)
      personService
      .Delete(id)
      .then(()=> {
        setPersons(persons.filter(n => n.id !== id))
        setNewName('')
        setNewNumber('')
        setMessage(`Deleted ${TargetedP.name}.`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
          setMessageType(null)
        }, 5000)
    })
    }
  
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm 
        addNameNumber={addNameNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons newFilter={newFilter} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}   

export default App