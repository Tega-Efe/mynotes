import AddButton from '../components/AddButton'
import React, {useEffect, useState} from 'react'
// import notes from '../assets/data'
import ListItem from '../components/ListItem'

const NotesListPage = () => {

  let [notes, setNotes] = useState([])
  
  useEffect(() => {
    getNotes()

  },[])
  // the empty square bracket represents adding depencies to the eseeffct function in other 
  // the state to load only on the first load


  let getNotes = async() => {
      let response = await fetch('http://localhost:3001/notes')
      let data = await response.json()
      // console.log("data:", data)
      setNotes(data)

  }

  return (
    <div className='notes'>
      <div className='notes-header'>
          <h2 className='notes-title'>&#9782; Notes</h2>
          <p className='notes-count'>{notes.length}</p>
      </div>

      <div className='notes-list'>
          {notes.map((note, index) => (
                <ListItem key={index} note={note}/>
          ))}
      </div>
      <AddButton/>
    </div>
  )
}

export default NotesListPage;
