// ShowNote.js

import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import StickyNote from './StickyNote';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import base_url from '../../api/bootapi'; // Ensure this is the correct path

const ShowNote = () => {
  const [notes, setNotes] = useState([]);
  const loggedInUser = localStorage.getItem('loginUser');
  const token = JSON.parse(loggedInUser).jwtToken;
  const useremail = JSON.parse(loggedInUser).username;

  useEffect(() => {
    fetchNotes(); // Fetch all notes from API on initial load
  }, []);

  const colors = ['rgb(255 244 148)', '#ffcc80', 'rgb(233 179 163)', '#e6ee9c', 'rgb(156 217 225)', 'rgb(208 192 235)', 'rgb(150 183 199)'];

  const fetchNotes = async () => {
    try {
      const response = await axios.get(`${base_url}/get-notes/${useremail}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const fetchedNotes = response.data.map((note, index) => ({
        ...note,
        colorIndex: index % colors.length
      }));
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addTemporaryNote = () => {
    const tempNote = { id: null, notes: '', colorIndex: notes.length };
    setNotes([...notes, tempNote]);
  };

  const saveNote = async (content) => {
    try {
      const newNote = { notes: content, useremail: useremail, colorIndex: notes.length };
      const response = await axios.post(`${base_url}/add-note`, newNote, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const savedNote = response.data;
      const updatedNotes = [...notes.filter(note => note.id !== null), savedNote];
      setNotes(updatedNotes);
      fetchNotes();
      toast.success('Note added successfully!');
    } catch (error) {
      toast.error('Something went wrong. Try again!');
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    if (id === null) {
      setNotes(notes.filter(note => note.id !== null));
    } else {
      try {
        await axios.delete(`${base_url}/delete-note/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNotes(notes.filter(note => note.id !== id));
        fetchNotes();
        toast.success('Note deleted successfully!');
      } catch (error) {
        toast.error('Something went wrong. Try again!');
        console.error('Error deleting note:', error);
      }
    }
  };

  const updateNote = async (id, content) => {
    try {
      const updatedNote = { id, notes: content, useremail: useremail };
      const response = await axios.put(`${base_url}/update-note/${id}`, updatedNote, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const updatedNoteData = response.data;
      const updatedNotes = notes.map(note => (note.id === id ? updatedNoteData : note));
      setNotes(updatedNotes);
      fetchNotes();
      toast.success('Note updated successfully!');
    } catch (error) {
      toast.error('Something went wrong. Try again!');
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 style={{ fontSize: '32px', marginTop: '30px' }}>Add Your Notes</h1>
      <Button color="success" onClick={addTemporaryNote}>
        <span style={{ fontSize: '20px' }}>+</span>
      </Button>
      <div className="d-flex flex-wrap mt-3">
        {notes.map(note => (
          <StickyNote
            key={note.id !== null ? note.id : `temp-${note.colorIndex}`}
            note={note}
            onDelete={deleteNote}
            onSave={saveNote}
            onUpdate={updateNote}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowNote;
