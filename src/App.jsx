import { useState } from 'react'

const Person = ({ person }) => {
  return <p>{ person.name } { person.number }</p>
}

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
      setPersons(persons.concat({ name: newName, number: newNumber }))
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

  const personsToDisplay = persons.filter(person => person
    .name
    .toLowerCase()
    .includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with 
        <input 
          type="text" 
          value={filterName}
          onChange={handleFilterNameChange}
        />
      </div>

      <h2>add a new</h2>
      <form onSubmit={handlePersonSubmission}>
        <div>
          name: 
          <input 
            type='text'
            value={newName} 
            onChange={handleNewNameChange}
          />
        </div>
        <div>
          number: 
          <input 
            type="text" 
            value={newNumber}
            onChange={handleNewNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <div>
        {personsToDisplay.map(person => <Person key={person.id} person={person} />)}
      </div>
    </div>
  )
}

export default App
