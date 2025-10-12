const Person = ({ person }) => {
  return <p>{ person.name } { person.number }</p>
}

const Persons = ({ filterName, persons }) => {
  const personsToDisplay = persons.filter(person => person
    .name
    .toLowerCase()
    .includes(filterName.toLowerCase()))

  return (
    <div>
      {personsToDisplay.map(person => <Person key={person.id} person={person} />)}
    </div>
  )
}

export default Persons