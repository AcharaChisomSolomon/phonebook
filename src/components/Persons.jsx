const Person = ({ person, handleDeletion }) => {
  return (
    <p>
      { person.name } { person.number }
      <button onClick={handleDeletion}>delete</button>
    </p>
  )
}

const Persons = ({ filterName, persons, handleDeletion }) => {
  const personsToDisplay = persons.filter(person => person
    .name
    .toLowerCase()
    .includes(filterName.toLowerCase()))

  return (
    <div>
      {personsToDisplay.map(person => (
        <Person 
          key={person.id} 
          person={person} 
          handleDeletion={() => handleDeletion(person.id)}
        />
      ))}
    </div>
  )
}

export default Persons