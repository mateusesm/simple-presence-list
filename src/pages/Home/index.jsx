import React, { useState, useEffect } from 'react'

import '../styles/style.css'

import { Card } from '../../components/Card'

export function Home() {

  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar_url: ''})

  function handleAddStudent() {

    const newStudent = {

      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {

        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'

      })

    }

    setStudents(prevState => [...prevState, newStudent])

  }

  useEffect(() => {

    async function getGitHubUser() {

      const response = await fetch("https://api.github.com/users/mateusesm")

      const data = await response.json()

      setUser(data)

    }

    getGitHubUser()

  }, [])
 
  return (
    
    <div className='container'>
      <header>

        <h1>Lista de Presença</h1>
        <div>

          <strong>{user.name}</strong>
          <img src={user.avatar_url} alt="Foto de perfil" />

        </div>

      </header>
      <input onChange={e => setStudentName(e.target.value)} type="text" placeholder="Digite o nome..." />

      <button onClick={handleAddStudent} type="button">Adicionar</button>

    {

      students.map(student => <Card key={student.time} name={student.name} time={student.time} />)

    }

    </div>

  )
}
