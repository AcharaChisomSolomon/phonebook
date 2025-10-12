import { useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handlePersonSubmission = event => {
    event.preventDefault()

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ 
        name: newName, 
        number: newNumber, 
        id: persons.length + 1 
      }))
    }

    setNewName('')
    setNewNumber('')
  }

  const handleNewNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = event => {
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      
      <Filter 
        filterName={filterName} 
        handleFilterNameChange={handleFilterNameChange} 
      />

      <h2>add a new</h2>
      
      <PersonForm 
        handleNewNameChange={handleNewNameChange}
        handleNewNumberChange={handleNewNumberChange}
        handlePersonSubmission={handlePersonSubmission}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      
      <Persons filterName={filterName} persons={persons} />
    </div>
  )
}

export default App
