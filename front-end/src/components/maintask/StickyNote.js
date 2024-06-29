// StickyNote.js
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Button, Input } from 'reactstrap';
import { FaCheck, FaEdit, FaSave, FaTrash } from 'react-icons/fa';

const StickyNote = ({ note, onDelete, onSave, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(!note.id); // Set editing mode based on whether note has an ID
  const [content, setContent] = useState(note.notes);

  useEffect(() => {
    setContent(note.notes); // Sync content with note when note prop changes
  }, [note]);

  const handleSave = () => {
    if (note.id) {
      onUpdate(note.id, content); // Call update API if note has an ID
    } else {
      onSave(content); // Call save API if note does not have an ID
    }
    setIsEditing(false);
  };

  const colors = ['rgb(255 244 148)', '#ffcc80', 'rgb(233 179 163)', '#e6ee9c', 'rgb(156 217 225)', 'rgb(208 192 235)', 'rgb(150 183 199)'];

  const cardStyle = {
    width: '240px',
    height: '170px',
    backgroundColor: colors[note.colorIndex % colors.length], // Ensure note.colorIndex is valid
    margin: '10px',
    position: 'relative'
  };

  const iconContainerStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'flex',
    gap: '10px'
  };

  const textareaStyle = {
    height: '150px',
    paddingTop:'10px'
  };

  const cursorPointerStyle = {
    cursor: 'pointer',
    marginTop: '10px'
  };

  return (
    <Card style={cardStyle}>
      <CardBody>
        {isEditing ? (
          <Input
            type="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={textareaStyle}
          />
        ) : (
          <CardTitle style={{marginTop:'20px'}}>{content}<span style={{position:'absolute',color:'gray',bottom:'2px',right:'15px'}}>{note.date}</span></CardTitle>
        )}
        <div style={iconContainerStyle}>
          {isEditing ? (
            <FaCheck className='text-success' style={cursorPointerStyle} onClick={handleSave}>Save</FaCheck>
          ) : (
            <FaEdit className="text-primary" style={cursorPointerStyle} onClick={() => setIsEditing(true)} />
          )}
          <FaTrash className="text-danger" style={cursorPointerStyle} onClick={() => onDelete(note.id)} />
        </div>
      </CardBody>
    </Card>
  );
};

export default StickyNote;
