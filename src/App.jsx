import { useState } from 'react'

const Person = ({ person }) => {
  return <p>{ person.name }</p>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameSubmission = event => {
    event.preventDefault()
    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  const handleNewNameChange = event => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={handleNameSubmission}>
        <div>
          name: 
          <input 
            value={newName} 
            onChange={handleNewNameChange}
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
