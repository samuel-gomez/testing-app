import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import './App.css'

import AppBar from './components/AppBar'
import Spinner from './components/Spinner'
import AddPeople from './pages/AddPeople'

import Discover from 'pages/Discover'

import ListAll from './pages/ListAll'
import ShowPerson from './pages/ShowPerson'

const App = () => {
  const [statePeople, setStatePeople] = useState({
    isLoading: true,
    people: [],
  })
  const {isLoading, people} = statePeople

  useEffect(() => {
    const fetchPeople = async () => {
      const data = await fetch(
        'https://react-starter-api.vercel.app/api/people',
      )
      const {responseBody} = await data.json()
      setStatePeople({people: responseBody, isLoading: false})
    }
    fetchPeople()
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <AppBar />
        </header>
        <main>
          {isLoading ? (
            <Spinner />
          ) : (
            <Routes>
              <Route path="/all" element={<ListAll people={people} />} />
              <Route path="/discover" element={<Discover people={people} />} />
              <Route
                path="/person/:id"
                element={<ShowPerson people={people} />}
              />
              <Route path="/add-people" element={<AddPeople />} />
              <Route path="*" element={<Navigate to="/all" />} />
            </Routes>
          )}
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
