import axios from "axios";
const URL = 'http://localhost:3002/persons'

const getPersons = () => {
  const request = axios.get(URL)
  return request.then(res => res.data)
}

const createPerson = (personObject) => {
  const request = axios.post(URL, personObject)
  return request.then(res => res.data)
}

const deletePerson = id => {
  const request = axios.delete(`${URL}/${id}`)
  return request.then(res => {
    console.log(res.data)
    return res.data
  })
}

export default { getPersons, createPerson, deletePerson }