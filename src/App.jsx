import { useState, useEffect } from 'react'
import personService from './service/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    console.log('effect');
    personService
      .getPersons()
      .then(persons => {
        console.log('persons gotten');
        setPersons(persons)
      })
  }, [])
  console.log('render', persons.length, 'persons');
  

  const handlePersonSubmission = event => {
    event.preventDefault()

    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { 
        name: newName, 
        number: newNumber, 
        id: `${persons.length + 1}` 
      }
      personService
        .createPerson(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const handleDeletion = id => {
    const personToDelete = persons.find(p => p.id !== id)

    if (!window.confirm(`Delete ${personToDelete.name} ?`)) {
      return 
    }

    personService
      .deletePerson(id)
      .then(deletedPerson => {
        setPersons(persons.filter(p => p.id !== deletedPerson.id))
      })
      .catch(err => {
        console.log(err);
        alert(`${personToDelete.name} is already deleted!`)
        setPersons(persons.filter(p => p.id !== id))
      })
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
      
      <Persons 
        filterName={filterName} 
        persons={persons}
        handleDeletion={handleDeletion}
      />
    </div>
  )
}

export default App
