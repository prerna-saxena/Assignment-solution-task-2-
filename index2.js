import React, { useState } from 'react';
import axios from 'axios';

function ComponentForm() {
  const [id, setId] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    axios.post('http://localhost:3000/component', { content })
      .then(response => {
        console.log(response.data);
        setId('');
        setContent('');
      })
      .catch(error => {
        console.error('Error adding component data:', error);
      });
  };

  const handleUpdate = () => {
    axios.post('http://localhost:3000/component', { id, content })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error updating component data:', error);
      });
  };

  return (
    <div>
      <input type="text" value={id} onChange={e => setId(e.target.value)} placeholder="ID (optional)" />
      <input type="text" value={content} onChange={e => setContent(e.target.value)} placeholder="Content" />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default ComponentForm;
