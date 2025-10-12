const Filter = ({ filterName, handleFilterNameChange }) => {
  return (
    <div>
      filter shown with 
      <input 
        type="text" 
        value={filterName}
        onChange={handleFilterNameChange}
      />
    </div>
  )
}

export default Filter