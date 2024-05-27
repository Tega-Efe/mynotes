import React, {useEffect, useState} from 'react';
// import notes from '../assets/data';
import { useParams } from 'react-router-dom'; // Import useParams
// import {Link}from 'react-router-dom'
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'

const NotesPage = () => {
    const { id } = useParams(); // Use useParams hook to get route parameters

    // let note = notes.find(note => note.id === Number(id));
    let[note, setNote] = useState(null)
    //always set state at the first level of the component

    useEffect(() =>{
        getNote()
    }, [id])

    //this depency calls useeffect function anytime the noteid is changed

    let getNote = async() =>{
        if (id === 'new') return
        let response = await fetch(`http://localhost:3001/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    let updateNote = async() => {
        await fetch(`http://localhost:3001/notes/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated': new Date() })
        } )
    }


    let createNote = async() => {
        await fetch(`http://localhost:3001/notes`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated': new Date() })
        } )
    }

    let deleteNote = async() => {
        await fetch(`http://localhost:3001/notes/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note )
        } )
        window.history.back() 
    }

    let handleSubmit = () =>{

        if(id !== 'new' && !note.body){
            deleteNote()
        }else if(id !=='new'){
            updateNote()
        }else if(id === 'new' && note !== null){
            createNote()
        }
        // updateNote()
        window.history.back() //push method wasn't defined and won't work on history the way you used it because it is a paremeter entering your function NotesPage. Perhaps it could work but probably not with .push() method, I don't know. This code gives you what you want. You can use alt+Z to escape this word wrap form if you don't like it
    }



    return (
        <div className='note'>
            <div className='note-header'>
                <h3>
                    {/* <Link to='/'> */}
                        <ArrowLeft onClick= {handleSubmit}/>
                    {/* </Link> */}
                </h3>
                
                {id !== 'new' ?(
                    <button onClick={deleteNote}>Delete</button>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}

                
            </div>

            {/* <p>{note?.body}</p>  */}

            <textarea onChange={(e)=> {setNote({...note, 'body' :e.target.value })}} value={note?.body}>


            </textarea>
        </div>
    );
};

export default NotesPage;

