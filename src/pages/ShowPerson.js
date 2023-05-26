import React from 'react'
import {useParams} from 'react-router-dom'
import Person from '../components/Person'

const ShowPerson = ({people}) => {
  const params = useParams()

  const person = people.find(person => person.id === params.id)

  return (
    <div className="card-container">
      {person ? <Person person={person} /> : <h1>Person not found :(</h1>}
    </div>
  )
}

export default ShowPerson
