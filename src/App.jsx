import { useState } from 'react'

const Person = ({ person }) => {
  return <p>{ person.name } { person.number }</p>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>

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
        {persons.map((person, id) => <Person key={id} person={person} />)}
      </div>
    </div>
  )
}

export default App
