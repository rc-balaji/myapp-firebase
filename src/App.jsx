import React, { useEffect, useState } from 'react';
import './App.css';
import UserSearch from './UserSearch';
import { Auth } from './components/auth';

import { db ,auth } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';

function App() {
  const [movies, setMovies] = useState([]);
  const [movieTitle, setMovieTitle] = useState('');
  const [releaseDate, setReleaseDate] = useState(0);
  const [oscar, setOscar] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');

  const movieColl = collection(db, 'movies');

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await getDocs(movieColl);
        const filterData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovies(filterData);
      } catch (err) {
        console.log(err);
      }
    };

    getMovie();
  }, [movieColl]);

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await deleteDoc(movieDoc);
  };

  const updateMovie = async (id) => {
    const movieDoc = doc(db, 'movies', id);
    await updateDoc(movieDoc, { title: updateTitle });
  };

  const submitMovie = async () => {
    try {
      await addDoc(movieColl, {
        title: movieTitle,
        date: releaseDate,
        recOscar: oscar,
        userId : auth?.currentUser?.uid,
      });
      
      setMovieTitle('');
      setReleaseDate(0);
      setOscar(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Auth />
      <div className="container">
        <section className="input-section">
          <h2>Add a Movie</h2>
          <input
            placeholder="Movie Title"
            onChange={(e) => setMovieTitle(e.target.value)}
            value={movieTitle}
          />
          <input
            placeholder="Release Date"
            type="number"
            onChange={(e) => setReleaseDate(Number(e.target.value))}
            // value={releaseDate}
          />
          <input
            type="checkbox"
            onChange={(e) => setOscar(e.target.checked)}
            checked={oscar}
          />
          <label>Oscar</label>
          <button onClick={submitMovie}>Submit Movie</button>
        </section>
        <section className="movie-list">
          <h2>Movie List</h2>
          <div className="grid">
            {movies.map((movie, index) => (
              <div key={index} className="movie-item">
                <h3 className={movie.recOscar ? 'oscar' : 'no-oscar'}>{movie.title}</h3>
                <p>Date: {movie.date}</p>
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
                <input
                  placeholder="New Title"
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  // value={updateTitle}
                />
                <button onClick={() => updateMovie(movie.id)}>Update</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
