const PersonForm = ({ 
  handleNewNameChange, 
  handleNewNumberChange,
  handlePersonSubmission,
  newName,
  newNumber
}) => {
  return (
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
  )
}

export default PersonForm