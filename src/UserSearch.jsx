// src/components/UserSearch.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserSearch() {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUserId(event.target.value);
  };

  const handleSubmit = () => {
    axios.get(`http://localhost:3003/api/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        setError(null);
      })
      .catch((err) => {
        setUser(null);
        setError('User not found');
      });
  };

  return (
    <div>
      <h1>User Search</h1>
      <input
        type="text"
        placeholder="Enter User ID"
        value={userId}
        onChange={handleInputChange}
      />
      <button onClick={handleSubmit}>Search</button>
      {user && (
        <div>
          <h2>User Details</h2>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default UserSearch;
