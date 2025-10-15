import { useState, useEffect } from 'react'
import personService from './service/persons'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)

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

    const potentialPerson = (
      persons
        .find(p => p.name.toLowerCase() === newName.toLowerCase())
    )

    if (potentialPerson) {
      if (potentialPerson.number === newNumber) {
        alert(`${newName} is already added to phonebook`)
      } else {
        if (!window.confirm(`${potentialPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
          return
        }

        const updatedPerson = { ...potentialPerson, number: newNumber }
        personService
          .updatePerson(potentialPerson.id, updatedPerson)
          .then(updatedPerson_ => {
            setPersons(persons.map(p => p.id === updatedPerson_.id ? updatedPerson_ : p))
          })
      }
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
      setNotification({ classType: 'success', message: `Added ${newPerson.name}`})
      setTimeout(() => setNotification(null), 3000)
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

      <Notification notification={notification} />
      
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
